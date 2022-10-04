package com.zhifou.ztc.utils.webapi.讯飞公式识别;


import com.jayway.jsonpath.JsonPath;

public class Demo {
    private static String json="{\"code\":0,\"data\":{\"_engine_info\":{\"category\":\"teaching_assistance_photo\",\"name\":\"iFlytek-Confucius Engine\",\"version\":\"2.0.0.1101\"},\"protocol\":\"2.0\",\"region\":[{\"coord\":{\"x\":[\"352\",\"351\",\"350\",\"349\",\"347\",\"343\",\"14\",\"13\",\"11\",\"10\",\"10\",\"19\",\"21\",\"94\",\"99\",\"110\",\"135\",\"163\",\"303\",\"312\",\"316\",\"319\",\"351\",\"352\"],\"y\":[\"70\",\"90\",\"95\",\"98\",\"100\",\"101\",\"106\",\"106\",\"102\",\"91\",\"55\",\"37\",\"35\",\"5\",\"4\",\"3\",\"3\",\"4\",\"10\",\"11\",\"12\",\"15\",\"58\",\"61\"]},\"recog\":{\"content\":\" ifly-latex-begin \\\\lim _ {x\\\\rightarrow 0} ifly-latex-end  ifly-latex-begin \\\\frac {\\\\int _ {0}^ {x}t\\\\sin (x^ {2}-t^ {2})dt}{(1-\\\\cos x)\\\\ln (1+2x^ {2})} ifly-latex-end \",\"element\":[{\"conf\":1,\"content\":\"\\\\lim\"},{\"conf\":1,\"content\":\"_\"},{\"conf\":1,\"content\":\"{\"},{\"conf\":1,\"content\":\"x\"},{\"conf\":1,\"content\":\"\\\\rightarrow\"},{\"conf\":1,\"content\":\"0\"},{\"conf\":1,\"content\":\"}\"},{\"conf\":1,\"content\":\"\\\\frac\"},{\"conf\":1,\"content\":\"{\"},{\"conf\":1,\"content\":\"\\\\int\"},{\"conf\":1,\"content\":\"_\"},{\"conf\":1,\"content\":\"{\"},{\"conf\":1,\"content\":\"0\"},{\"conf\":1,\"content\":\"}\"},{\"conf\":1,\"content\":\"^\"},{\"conf\":1,\"content\":\"{\"},{\"conf\":1,\"content\":\"x\"},{\"conf\":1,\"content\":\"}\"},{\"conf\":1,\"content\":\"t\"},{\"conf\":1,\"content\":\"\\\\sin\"},{\"conf\":1,\"content\":\"(\"},{\"conf\":1,\"content\":\"x\"},{\"conf\":1,\"content\":\"^\"},{\"conf\":1,\"content\":\"{\"},{\"conf\":1,\"content\":\"2\"},{\"conf\":1,\"content\":\"}\"},{\"conf\":1,\"content\":\"-\"},{\"conf\":1,\"content\":\"t\"},{\"conf\":1,\"content\":\"^\"},{\"conf\":1,\"content\":\"{\"},{\"conf\":1,\"content\":\"2\"},{\"conf\":1,\"content\":\"}\"},{\"conf\":1,\"content\":\")\"},{\"conf\":1,\"content\":\"d\"},{\"conf\":1,\"content\":\"t\"},{\"conf\":1,\"content\":\"}\"},{\"conf\":1,\"content\":\"{\"},{\"conf\":1,\"content\":\"(\"},{\"conf\":1,\"content\":\"1\"},{\"conf\":1,\"content\":\"-\"},{\"conf\":1,\"content\":\"\\\\cos\"},{\"conf\":1,\"content\":\"x\"},{\"conf\":1,\"content\":\")\"},{\"conf\":1,\"content\":\"\\\\ln\"},{\"conf\":1,\"content\":\"(\"},{\"conf\":1,\"content\":\"1\"},{\"conf\":1,\"content\":\"+\"},{\"conf\":1,\"content\":\"2\"},{\"conf\":1,\"content\":\"x\"},{\"conf\":1,\"content\":\"^\"},{\"conf\":1,\"content\":\"{\"},{\"conf\":1,\"content\":\"2\"},{\"conf\":1,\"content\":\"}\"},{\"conf\":1,\"content\":\")\"},{\"conf\":1,\"content\":\"}\"}],\"exception\":0},\"type\":\"text\"}]},\"message\":\"success\",\"sid\":\"itr00081a71@gz17d510e1ca6460a902\"}";
    public static void main(String[] args) throws Exception {
        FormulaRecognitionUtil formulaRecognitionUtil = new FormulaRecognitionUtil();
        String sourceResult = formulaRecognitionUtil.getSourceResult();
        System.out.println(sourceResult);
        String sss = (String)JsonPath.parse(sourceResult).read("$.data.region[0].recog.content");
        sss = sss.replaceAll(" ifly-latex-begin ", "");
        sss = sss.replaceAll(" ifly-latex-end ", "");
        //sss = sss.replaceAll(" ", "");

        System.out.println(sss);
    }
}
