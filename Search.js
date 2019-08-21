function search(SEARCH){
    const d = new Date();
    let smtr_no;
    if(d.getMonth()>=6){
        smtr_no = d.getFullYear()+"1";
        }else{
            smtr_no = (d.getFullYear()-1)+"2";
        }
$.ajax({type: "POST",
       url: "/WebService.asmx/GET_SUBJECT",
       data: "{SMTRNO:'" + smtr_no + "',SEARCH:'" + SEARCH + "'}",
       contentType: "application/json; charset=utf-8",
       dataType: "json",
       success: function (response1) {
           console.log("length : "+response1.d.length);
           const courses = response1.d;
           for(var i =0;i<courses.length;i++){
               let course = courses[i];
                $.ajax({type: "POST",
                   url: "/WebService.asmx/Load_Subject_Branches",
                   data: "{SMTRNO:"+20191+",SUBNO:"+course.SUB_NO+"}",
                   contentType: "application/json; charset=utf-8",
                   dataType: "json",
                   success: function (response2) {
                       for(var j=0;j<response2.d.length;j++){
                           var sub = response2.d[j];
                           console.log(course.SUBJECT_NO + " : " + course.SUBJECT_A_NAME+" : ("+sub.DAYNAME+" "+sub.TIMETEXT+" , "+sub.BRANCH_NO +" , "+ sub.TRNAME+")");
                           }},
                      error: function (msg) {console.log("Error : ");console.log(msg);}
                      });
               }
    },
    error: function (msg) {console.log("Error : ");console.log(msg);}
});
}
search("ISSE");
search("COMP");
search("UNIB");
search("MATH");
