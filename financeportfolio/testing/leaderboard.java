package com.example.tests;

import java.util.regex.Pattern;
import java.util.concurrent.TimeUnit;
import org.junit.*;
import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.*;
import org.openqa.selenium.*;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.Select;

public class SearchTopGainers {
  private WebDriver driver;
  private String baseUrl;
  private boolean acceptNextAlert = true;
  private StringBuffer verificationErrors = new StringBuffer();

  @Before
  public void setUp() throws Exception {
    driver = new FirefoxDriver();
    baseUrl = "http://192.168.1.192:3000/";
    driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
  }

  @Test
  public void testSearchTopGainers() throws Exception {
    driver.get(baseUrl + "/");
    driver.findElement(By.name("gainersTable_length")).click();
    new Select(driver.findElement(By.name("gainersTable_length"))).selectByVisibleText("10");
    driver.findElement(By.cssSelector("option[value=\"10\"]")).click();
    driver.findElement(By.cssSelector("input[type=\"search\"]")).click();
    driver.findElement(By.linkText("2")).click();
    driver.findElement(By.linkText("3")).click();
    driver.findElement(By.linkText("4")).click();
    driver.findElement(By.linkText("2")).click();
    driver.findElement(By.linkText("1")).click();
    driver.findElement(By.name("loosersTable_length")).click();
    new Select(driver.findElement(By.name("loosersTable_length"))).selectByVisibleText("10");
    driver.findElement(By.cssSelector("select[name=\"loosersTable_length\"] > option[value=\"10\"]")).click();
    driver.findElement(By.cssSelector("#loosersTable_filter > label > input[type=\"search\"]")).click();
    driver.findElement(By.xpath("(//a[contains(text(),'2')])[2]")).click();
    driver.findElement(By.id("cName")).click();
    driver.findElement(By.id("ui-id-2")).click();
    driver.findElement(By.cssSelector("g.highcharts-navigator-handle-right > rect")).click();
    driver.findElement(By.cssSelector("g.highcharts-navigator-handle-right > path")).click();
    driver.findElement(By.xpath("//li[2]/a/span")).click();
    driver.findElement(By.id("board")).click();
    new Select(driver.findElement(By.id("board"))).selectByVisibleText("Gainers");
    driver.findElement(By.id("group")).click();
    driver.findElement(By.id("group")).click();
    driver.findElement(By.id("group")).click();
    new Select(driver.findElement(By.id("group"))).selectByVisibleText("Industry");
    driver.findElement(By.cssSelector("option[value=\"industry\"]")).click();
    driver.findElement(By.id("size")).click();
    new Select(driver.findElement(By.id("size"))).selectByVisibleText("Standard Deviation");
    driver.findElement(By.cssSelector("option[value=\"standardDeviation\"]")).click();
    driver.findElement(By.id("group")).click();
    new Select(driver.findElement(By.id("group"))).selectByVisibleText("Sector");
    driver.findElement(By.cssSelector("option[value=\"sicSector\"]")).click();
    driver.findElement(By.id("group")).click();
    new Select(driver.findElement(By.id("group"))).selectByVisibleText("Exchange");
    driver.findElement(By.cssSelector("option[value=\"exchange\"]")).click();
    driver.findElement(By.id("color")).click();
    new Select(driver.findElement(By.id("color"))).selectByVisibleText("Exchange");
    driver.findElement(By.cssSelector("#color > option[value=\"exchange\"]")).click();
    driver.findElement(By.id("color")).click();
    new Select(driver.findElement(By.id("color"))).selectByVisibleText("Last Price");
    driver.findElement(By.cssSelector("#color > option[value=\"lastPriceCategory\"]")).click();
  }

  @After
  public void tearDown() throws Exception {
    driver.quit();
    String verificationErrorString = verificationErrors.toString();
    if (!"".equals(verificationErrorString)) {
      fail(verificationErrorString);
    }
  }

  private boolean isElementPresent(By by) {
    try {
      driver.findElement(by);
      return true;
    } catch (NoSuchElementException e) {
      return false;
    }
  }

  private boolean isAlertPresent() {
    try {
      driver.switchTo().alert();
      return true;
    } catch (NoAlertPresentException e) {
      return false;
    }
  }

  private String closeAlertAndGetItsText() {
    try {
      Alert alert = driver.switchTo().alert();
      String alertText = alert.getText();
      if (acceptNextAlert) {
        alert.accept();
      } else {
        alert.dismiss();
      }
      return alertText;
    } finally {
      acceptNextAlert = true;
    }
  }
}
