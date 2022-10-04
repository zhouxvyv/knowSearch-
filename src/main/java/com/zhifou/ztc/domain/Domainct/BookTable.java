package com.zhifou.ztc.domain.Domainct;

public class BookTable {
    int bookId;
    String bookIsbn;
    String bookName;
    String bookIntroduction;
    String bookInformation;

    public int getBookId() {
        return bookId;
    }

    public void setBookId(int bookId) {
        this.bookId = bookId;
    }

    public String getBookIsbn() {
        return bookIsbn;
    }

    public void setBookIsbn(String bookIsbn) {
        this.bookIsbn = bookIsbn;
    }

    public String getBookName() {
        return bookName;
    }

    public void setBookName(String bookName) {
        this.bookName = bookName;
    }

    public String getBookIntroduction() {
        return bookIntroduction;
    }

    public void setBookIntroduction(String bookIntroduction) {
        this.bookIntroduction = bookIntroduction;
    }

    public String getBookInformation() {
        return bookInformation;
    }

    public void setBookInformation(String bookInformation) {
        this.bookInformation = bookInformation;
    }

    @Override
    public String toString() {
        return "bookTable{" +
                "bookId=" + bookId +
                ", bookIsbn='" + bookIsbn + '\'' +
                ", bookName='" + bookName + '\'' +
                ", bookIntroduction='" + bookIntroduction + '\'' +
                ", bookInformation='" + bookInformation + '\'' +
                '}';
    }
}
