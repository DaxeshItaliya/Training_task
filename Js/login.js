function validateForm(){

    var user_ID=document.forms["login_form"]["user_iD"].value;
    var password=document.forms["login_form"]["password"].value;
    var submit=document.forms["login_form"]["submit"];

    var term_condition=document.forms["login_form"]["term_condition"];
    
    var User_Id_warning=document.getElementById("User_Id_warning");
    var Notice_warning=document.getElementById("Notice_warning");
    var main_warning=document.getElementById("main_warning");
  
    var Loading=document.getElementById("Loading");

    User_Id_warning.style.display="none";
    Notice_warning.style.display="none";
    main_warning.style.display="none";
    Loading.style.display="none";

    
    // var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    console.log(user_ID);
    console.log(password);
    console.log(term_condition.checked);
    
    if(user_ID=="")
    {
        User_Id_warning.style.display="block";
        User_Id_warning.innerHTML="Please Enter User Id";
        return false;
    }
    else if( password=="")
    {
        Notice_warning.style.display="block";
        Notice_warning.innerHTML="Please Enter Password";
        return false;
    }
    else if( term_condition.checked!=true)
    {
        main_warning.style.display="block";
        main_warning.innerHTML="Please Check Accept Term and Condition";
        return false;
    }else
    {
        Loading.style.display="block";
    }
}

function On_load(){
    var User_Id_warning=document.getElementById("User_Id_warning");
    var Notice_warning=document.getElementById("Notice_warning");
    var Loading=document.getElementById("Loading");
    var main_warning=document.getElementById("main_warning");

    User_Id_warning.style.display="none";
    Notice_warning.style.display="none";
    Loading.style.display="none";
    main_warning.style.display="none";
}

function user_ID_text_Change()
{
    var user_ID=document.forms["login_form"]["user_iD"].value;
    if(user_ID=="")
    {
        User_Id_warning.style.display="block";
        User_Id_warning.innerHTML="Please Enter User Id";
        return false;
    }else
    {
        User_Id_warning.style.display="none";
    }
}

function Pass_text_Change()
{
    var user_ID=document.forms["login_form"]["user_iD"].value;
    if(user_ID=="")
    {
        User_Id_warning.style.display="block";
        User_Id_warning.innerHTML="Please Enter User Id";
        return false;
    }else
    {
        User_Id_warning.style.display="none";
    }
}
