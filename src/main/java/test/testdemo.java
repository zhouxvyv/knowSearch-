package test;

import com.zhifou.ztc.dao.DpDao;
import com.zhifou.ztc.dao.impl.DpDaoImpl;

public class testdemo {
    public static void main(String[] args) {
        DpDao dao=new DpDaoImpl();
        int dpid=dao.constructDp(2);
        System.out.println(dpid);

    }}
