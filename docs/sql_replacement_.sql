update TRANSLATOR_TRANSLATIONS 
    set item = replace(initcap(replace(replace(replace(ITEM,'_',' '), '-', ' '), '.', ' ')),' ','')


select item,text from TRANSLATOR_TRANSLATIONS;


