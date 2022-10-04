package com.zhifou.ztc.old.web.keep.servlet;

import com.google.gson.Gson;
import com.jayway.jsonpath.JsonPath;
import com.zhifou.ztc.pojo.User;
import com.zhifou.ztc.pojo.Search;
import com.zhifou.ztc.service.impl.SearchServiceImpl;
import com.zhifou.ztc.service.SearchService;
import com.zhifou.ztc.utils.webapi.百度文字识别.testApi.TextRecognitionUtil;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileItemFactory;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.io.IOUtils;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.sql.Timestamp;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

@WebServlet("/readFileServlet.Servlets")
public class ReadFileServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        String key = "";
        response.setContentType("application/json;charset=utf-8");
        HashMap<String, Object> map = new HashMap<>();
        Gson gson = new Gson();
        System.out.println("1");
        // 1.判断数据是否为多端数据
        if(ServletFileUpload.isMultipartContent(request)){
            map.put("success",false);
            // 2.创建FileItemFactory工程实现类
            FileItemFactory fileItemFactory = new DiskFileItemFactory();
            // 3.创建解析上传数据的工具类 ServletFileUpdate类
            ServletFileUpload servletFileUpload = new ServletFileUpload(fileItemFactory);
            try {
                // 3.得到解析后的上传数据
                List<FileItem> fileItems = servletFileUpload.parseRequest(request);
                // 4.遍历,判断是否为文件类型

                System.out.println("3");
                for(FileItem fileItem : fileItems){
                    if(fileItem.isFormField()){
                        System.out.println("这是普通表单项目");
                        System.out.println("name: "+ fileItem.getFieldName());
                        System.out.println("value: "+fileItem.getString("utf-8")+"\n\n");
                    }
                    else{
                        System.out.println("这是文件内容");
                        System.out.println("name: " + fileItem.getFieldName());
                        System.out.println("fileName: " + fileItem.getName());
                        if(fileItem.getName().substring(fileItem.getName().indexOf(".")).equals("txt"))
                            System.out.println("value: " +fileItem.getString("utf-8"));
                        System.out.println("\n");




                        // 6.处理文件
                        TextRecognitionUtil textRecognitionUtil = new TextRecognitionUtil();
                        String result = textRecognitionUtil.docAnalysis(fileItem.getInputStream());
                        System.out.println(result);

                        List<String> sss = JsonPath.parse(result).read("$.results[*].words.word");
                        System.out.println(sss);
                        for(String i : sss){
                            key = key+i;
                        }
                        key=key.replace("{"," ");
                        key=key.replace("}"," ");
                        // 7.跳转回去
                        response.setContentType("application/json;charset=utf-8");
                        System.out.println(key);


                        // 6.1 添加搜索记录
                        User user = (User) request.getSession().getAttribute("user");
                        if(user!=null){
                            // 5.存储文件
                            ServletContext servletContext = this.getServletContext();
                            String realPath = servletContext.getRealPath("/public/findImage");
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


                            String webPath = "/public/findImage" + "/" + uuid + "-" + fileItem.getName();
                            Search searchDomain = new Search(user.getUserId(), webPath, new Timestamp(new Date().getTime()), key);
                            SearchService searchService = new SearchServiceImpl();
                            searchService.insertSearch(searchDomain);
                            // request.getSession().setAttribute("searchNext", searchDomain);
                        }
                    }
                }
            } catch (FileUploadException e) {
                e.printStackTrace();
            } catch (Exception e) {
                e.printStackTrace();
            }

        }
        else map.put("success",false);

        map.put("key",key);

        response.getWriter().write(gson.toJson(map));
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("utf-8");
        this.doGet(request, response);
    }
}
