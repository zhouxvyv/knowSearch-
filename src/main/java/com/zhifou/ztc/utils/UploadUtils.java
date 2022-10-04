package com.zhifou.ztc.utils;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.util.List;
import java.util.UUID;

public class UploadUtils {
    public static String basepath;
    private static List<FileItem> items;
    public void uploadUtils(HttpServletRequest request) throws FileUploadException {
        DiskFileItemFactory diskFileItemFactory = new DiskFileItemFactory();
        ServletContext servletContext = request.getServletContext();
        basepath=servletContext.getRealPath("/");
        ServletFileUpload Upload = new ServletFileUpload(diskFileItemFactory);
        items=Upload.parseRequest(request);
        System.out.println(basepath);
    }
    public String processFormFiled(String fieldname){
        String value="";
        for (FileItem item : items) {
            String name=item.getFieldName();
            if(name.equalsIgnoreCase(fieldname))
            {
                value=item.getString();
            }
        }
        return value;
    }
    public String processUploadFiled(String fieldname,String path) throws Exception {
        for (FileItem item : items) {
            if(!item.isFormField())
            {
                String fieldName = item.getFieldName();
                if(fieldName.equalsIgnoreCase(fieldname))
                {
                    String uuid = UUID.randomUUID().toString().replace("-", "");
                    String name = item.getName();
                    fieldName = uuid+name.substring(name.lastIndexOf("."));
                    File uploadFile = new File(basepath +path+ "\\" + fieldName);
                    item.write(uploadFile);
                    return fieldName;
                }
            }
        }
        return fieldname;
    }
}
