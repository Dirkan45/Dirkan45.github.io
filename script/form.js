function runValidate(form){
    if(validateName(form) && validateEmail(form) && validateAge(form) && validateImage(form)){
        displayInput(form);
        unhideImage(form);
        return false; //logically not correct but will let us stay in the page
    }
}

// function validateName to validate the name input
function validateName(form){
    var fname = form.elements["firstName"]; 
    if(fname.validity.valueMissing){
        //no input at all
        fname.setCustomValidity("Please enter your name here");
        return false;
    }
    else{
        //there is some data
        fname.setCustomValidity("");
        return true;
    }
} // end validateName function

// function validateName to validate the email input
function validateEmail(form){
    var femail = form.elements["email"]; 
    if(femail.validity.valueMissing){
        //no input at all
        femail.setCustomValidity("Please enter your email address here");
        return false;
    }
    else if(femail.validity.patternMismatch){
        //it has some data, but the pattern does not match
        femail.setCustomValidity("Please enter a valid Douglas email address");
        return false
    }
    else{
        femail.setCustomValidity("");
        return true;
    }
} // end validateEmail function

// function validateAge to validate the age selection
function validateAge(form){
    var fage = form.elements["age"]; 
    if(fage.value == ""){
        //no selection made
        fage.setCustomValidity("Please select one of the age range");
        return false;
    }
    else{
        fage.setCustomValidity("");
        return true;
    }
} // end validateAge function

// function validateImage to validate the location selection
function validateImage(form){
    var radio = form.elements["image"]; // get all radio buttons
    var showImg = document.getElementById("image_src");
    var radioValid = false;

    for(let i=0; i<radio.length; i++){
        if(radio[i].checked){
            showImg.src = radio[i].value;
            radioValid = true;
            break;
        }
    }
    if(!radioValid){
        radio[1].setCustomValidity("Please select one of the location");
    }
    return radioValid;
} // end validateImage function

// function display valid input
function displayInput(form){
    var fname = form.elements["firstName"].value;
    fname = fname.toUpperCase();
    var text = form.elements["message"].value;
    var location;

    var radio = form.elements["image"];
    for(let i=0; i<radio.length; i++){
        if(radio[i].checked){
            switch(i){
                case 0:
                    location = "Home";
                    break;
                case 1:
                    location = "Bar";
                    break;
                case 2:
                    location = "Qatar";
                    break;
            }
            break;
        }
    }

    //target
    var target = document.getElementById("text_target");
    target.innerText = fname + " from  " + location + ": " + text;
}
// end of function

// function unhide target image
function unhideImage(form){
    var imgTarget = document.getElementById("image_target");
    imgTarget.style.visibility = "visible";    
}
// end of function