package com.zhifou.ztc.old.web.keep.filter;

import com.zhifou.ztc.pojo.User;
import com.zhifou.ztc.service.UserService;
import org.springframework.web.context.ContextLoader;
import org.springframework.web.context.WebApplicationContext;

import javax.servlet.*;
import javax.servlet.annotation.*;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@WebFilter("*.html")
public class AutoLoginFilter implements Filter {
    public void init(FilterConfig config) throws ServletException {
    }

    public void destroy() {

    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws ServletException, IOException {
        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse resp = (HttpServletResponse) response;
        HttpSession session = req.getSession();
        User userOn = (User) session.getAttribute("user");

        if(userOn == null){ // 需要登录
            String no = null;
            String pwd = null;
            Cookie[] cookies = req.getCookies();
            if(cookies!=null){
                for (Cookie cookie : cookies) {
                    if(cookie.getName().equals("no"))
                        no = cookie.getValue();
                    else if(cookie.getName().equals("pwd"))
                        pwd = cookie.getValue();
                }
            }

            if(no!=null && pwd!=null){
                User userDomain = new User(no, pwd);
                WebApplicationContext webApplicationContext = ContextLoader.getCurrentWebApplicationContext();
                UserService userService = (UserService) webApplicationContext.getBean("userService");
                User user = userService.getUser(userDomain);

                if(user!=null){
                    // 登录成功
                    session.setAttribute("user",user);
                }
            }
        }

        // 正常放行
        chain.doFilter(req, resp);
    }
}
