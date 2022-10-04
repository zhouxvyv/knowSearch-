package com.zhifou.ztc.utils;

/**
 * 模拟加密
 */
public class CodeUtils {
    private static String code= "abcdefghigklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ1234567890`~!@#$%^&*()-_=+[{]}\\|;:'\",<.>/?";
    private static String code1="]Io[{=NOPtu'\"#$g9BC567QRS%^&*()-_hD4qr\\|;:MKLvwxyz0`~!@pEsGm}FGH,<n+8c1aVWX.>b3dkTU/?A2YZefigl";
    public static String encode(String str){
        return getString(str, code1, code);
    }
    public static String decode(String str){
        return getString(str, code, code1);
    }

    private static String getString(String str, String code, String code1) {
        int length = str.length();
        StringBuilder result = new StringBuilder("");
        for(int i = 0; i < length; i++){
            result.append(code.charAt(code1.indexOf(str.charAt(i))));
        }
        return result.toString();
    }
}
