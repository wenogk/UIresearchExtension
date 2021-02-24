import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
chrome_options = Options()
#chrome_options.addArguments("load-extension=../../UIresearchExtension");
chrome_options.add_extension('UIresearchExtension.crx')
chrome_options.add_argument("user-data-dir=DIRECTORYTOPROFILEFOLDERWITHINAPPDATA")
chrome_options.add_experimental_option("detach", True)
driver = webdriver.Chrome('./chromedriver', chrome_options=chrome_options)  # Optional argument, if not specified will search path.

#driver.get('http://www.bbc.com/');
#time.sleep(5) # Let the user actually see something!
#search_box = driver.find_element_by_name('q')
#search_box.send_keys('ChromeDriver')
#search_box.submit()
time.sleep(25000) # Let the user actually see something!
driver.close()
driver.quit()