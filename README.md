# D4


**images meltdown**
feature: create generic images for categories and a blank one- will be used.

**order new -stopped working **

homepage - 3 section logic

[0]. manually clean files
[0]. protect inner pages - either manually or by hook.
[0]. improve search functionality


**order form ** - download receipt and show unavailable dates

- a generic pipe?





- הקוד אסתטי ונראה טוב ברובו. יש לרווח שורת קוד אחת בין פונקציות.

- קיימת ולידציה על שדות חובה בטופס הכנסת פעולה


- קיימים קבצים ריקים בצד הלקוח. ניתן היה להיפטר מהם.

- אם לא משתמשים עם Constructor עדיף למחוק אותו.

- אם לא משתמשים עם ngOnInit עדיף להיפטר ממנה (Cleaner Code).

- ניתן לשמור את כל ה-Base URLs לשרת במשתנה גלובלי אחד ב-Service.

- חסרה ולידציה על שדה חובה בדף הראשי, כמו כן - על כך שלא ניתן יהיה להכניס ערך לא מספרי. פעולות אלו גורמות לקריסה.

- אין כל הודעת שגיאה כאשר חשבון הבנק לא נמצא בדף הראשי.

- חסר ניקוי אוטומטי של הטופס בסיום הוספת פעולה או הפניה לדף אחר. המשתמש יכול להכניס שוב ושוב את אותה הפעולה.

- אין להשאיר קוד בהערות. יש להיפטר ממנו אם לא משתמשים בו.

- ישנה הצגה מיותרת של JSON ללקוח ע"י alert.



--------------------------------------------------------------
**order form ** - make a new order - V

** CART ** (check to reduce page reload- LM?) - check
1. not loading after refresh- need to hard empy cache:
when logged in (empty cart)
when adding an item to cart (without reload)

2. checkout empty -V

check some of assaf remarks + dvir file

--Register malfunction--
sends complete info to server, -V
 does not store in db, does not login. --x


** cart ** - still got some issues
3. images on cart - 0 (this actually because there are no pics) -V




reg form:
passwords do not match - no sign of life in some cases.
# D6
