package com.zhifou.ztc.old.web.keep.servlet;

import com.google.gson.Gson;
import com.zhifou.ztc.pojo.User;
import com.zhifou.ztc.pojo.Answer;
import com.zhifou.ztc.service.AnswerService;
import com.zhifou.ztc.service.impl.AnswerServiceImpl;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileItemFactory;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.io.IOUtils;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.*;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

@WebServlet("/addAnswerServlets")
public class AddAnswerServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession();
        User user = (User) session.getAttribute("user");
        String answer = "";
        String image = "";
        int topicId=0;
        response.setContentType("application/json;charset=utf-8");
        HashMap<String, Object> map = new HashMap<>();
        Gson gson = new Gson();
        // 1.判断数据是否为多端数据
        map.put("success",false);
        if(ServletFileUpload.isMultipartContent(request)){
            // 2.创建FileItemFactory工程实现类
            FileItemFactory fileItemFactory = new DiskFileItemFactory();
            // 3.创建解析上传数据的工具类 ServletFileUpdate类
            ServletFileUpload servletFileUpload = new ServletFileUpload(fileItemFactory);
            try {
                // 3.得到解析后的上传数据
                List<FileItem> fileItems = servletFileUpload.parseRequest(request);
                // 4.遍历,判断是否为文件类型
                for(FileItem fileItem : fileItems){
                    if(fileItem.isFormField()){
                        System.out.println("这是普通表单项目");
                        System.out.println("name: "+ fileItem.getFieldName());
                        System.out.println("value: "+fileItem.getString("utf-8")+"\n\n");


                        switch (fileItem.getFieldName()){
                            case "answer": answer=fileItem.getString("utf-8");break;
                            case "topicId": topicId=Integer.parseInt(fileItem.getString("utf-8"));break;
                        }
                    }
                    else{
                        System.out.println("这是文件内容");
                        System.out.println("name: " + fileItem.getFieldName());
                        System.out.println("fileName: " + fileItem.getName());
                        if(fileItem.getName().substring(fileItem.getName().indexOf(".")).equals("txt"))
                            System.out.println("value: " +fileItem.getString("utf-8"));
                        System.out.println("\n");

                        if(user!=null){
                            // 5.存储文件
                            ServletContext servletContext = this.getServletContext();
                            String realPath = servletContext.getRealPath("/public/noAnswerTopicImage");
                            UUID uuid = UUID.randomUUID();
                            String filePath = realPath+"/"+uuid+"-"+fileItem.getName();


                            InputStream is=fileItem.getInputStream();
                            File file=new File(filePath);
                            if(!file.exists()){
                                file.createNewFile();
                            }
                            OutputStream os=new FileOutputStream(file);
                            IOUtils.copy(is, os);
                            IOUtils.closeQuietly(is);
                            IOUtils.closeQuietly(os);


                            String webPath = "/public/noAnswerTopicImage" + "/" + uuid + "-" + fileItem.getName();
                            // 这里需要存储noANs题目
                            image = webPath;

                            // request.getSession().setAttribute("searchNext", searchDomain);
                        }
                    }
                }
                if(user!=null){
                    System.out.println("insert");
                    Answer answerDomain = new Answer(answer, image, user.getUserId(), topicId);
                    AnswerService answerService = new AnswerServiceImpl();
                    boolean b = answerService.addAnswer(answerDomain);
                    map.put("success",b);
                }
                else{
                    map.put("success",false);
                }

            } catch (FileUploadException e) {
                e.printStackTrace();
            } catch (Exception e) {
                e.printStackTrace();
            }

        }


        response.getWriter().write(gson.toJson(map));
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("utf-8");
        this.doGet(request, response);
    }
}
