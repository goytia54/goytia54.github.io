function changeInputStatus(idToChange, searchResult)
{
    var imageElement = document.getElementById(idToChange+"-img");
    imageElement.style.visibility = "visible"; 
    imageElement.setAttribute("hieght","24");
    imageElement.setAttribute("width","24");
    if (searchResult == 0)
    {
        imageElement.setAttribute("alt","correct");
        imageElement.setAttribute("src","ok.png")
    }
    else
    {
        imageElement.setAttribute("alt","incorrect");
        imageElement.setAttribute("src","false.png")
    }
}

function validName(name, elementId)
{
    var inputValidStatus = name.search(/^[a-zA-Z-]+$/);
    changeInputStatus(elementId, inputValidStatus)
}

function validEmail(email, elementId)
{
    var inputValidStatus = email.search(/^\w+@\w+[.](com|net|edu)$/);
    changeInputStatus(elementId, inputValidStatus)
}

function validAddress(address, elementId)
{
    if(elementId == "address-1")
    {
        var inputValidStatus = address.search(/^([1-9][0-9]*)+(\s[a-zA-Z, -']+)+$/);    
    }
    else
    {
        var inputValidStatus = address.search(/^[a-zA-Z0-9 -,'#.]*$/);
    }
    changeInputStatus(elementId, inputValidStatus)
}

function validZipCode(zipCode, elementId)
{
    var inputValidStatus = zipCode.search(/^\d{5}([-]\d{4})?$/);
    changeInputStatus(elementId, inputValidStatus)
}

function validCity(city, elementId)
{
    var inputValidStatus = city.search(/^([a-zA-z])+(\s[a-zA-z0-9]+)*$/);
    changeInputStatus(elementId, inputValidStatus)
}

function validCreditCardNumber(creditCardNumber, elementId)
{
    var inputValidStatus = creditCardNumber.search(/^(\d{4}[ ]\d{4}[ ]\d{4}[ ]\d{4}|\d{16})$/);   
    changeInputStatus(elementId, inputValidStatus);
}

function validState(state, elementId)
{
    var inputValidStatus = state.search(/^(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY])$/);
    changeInputStatus(elementId, inputValidStatus)
}

function validDate()
{
    var currentDate = new Date();
    var enteredCreditMonth = document.getElementById("credit-card-month");
    var enteredCreditYear = document.getElementById("credit-card-year");

    var yearValidStatus = enteredCreditYear.value.search(/^(201[7-9]|20[2-9][0-9])$/);
    var monthValidStatus = enteredCreditMonth.value.search(/^([1-9]|1[0-2])$/);
    if( enteredCreditYear.value == currentDate.getFullYear() && enteredCreditMonth.value <= currentDate.getMonth())
    {
        monthValidStatus = -1;
    }
    changeInputStatus(enteredCreditMonth.id, monthValidStatus);
    changeInputStatus(enteredCreditYear.id, yearValidStatus);
}

function updatePrice(quantity, elementId)
{
   var price = getPrices(elementId);
   document.getElementById(elementId+"-span").innerHTML = (price * quantity).toFixed(2);
   updatePrices();
}

function validPhoneNumber(phoneNumber, elementId)
{
    var inputValidStatus = phoneNumber.search(/^\d{3}-\d{3}-\d{4}$/);
    changeInputStatus(elementId, inputValidStatus);
}

function getPrices(elementId)
{
    var prices = {"x11":299.99, "razer":49.99,"gigabyte":109.99}; //This could be in a database
    return prices[elementId];
}

function updatePrices()
{
    var checkBoxes = document.getElementsByClassName("check-box")
    var subtotal;
    var tax = 0.00;
    var shipping;
    var total = 0;
    for (var i =0; i < checkBoxes.length; i++)
    {
        if(checkBoxes[i].checked == true)
        {
            var valueToModify = document.getElementById(checkBoxes[i].id.split("-")[0]);
            total += getPrices(valueToModify.id)*parseInt(valueToModify.value);
        }
    }
    if (total < 50.00 && total != 0)
    {
        shipping = 14.99;
    }
    else
    {
        shipping = 0.00;
    }
    subtotal = total;
    total = shipping + subtotal;
    document.getElementById("subtotal").innerHTML = "Subtotal:  $"+ subtotal.toFixed(2);
    document.getElementById("total").innerHTML = "Total:  $"+ total.toFixed(2);
    document.getElementById("tax").innerHTML = "Tax:  $"+tax.toFixed(2);
    document.getElementById("shipping").innerHTML = "Shipping:  $" + shipping.toFixed(2);
}

function submitPage()
{
    window.alert("here")
    formImages = document.getElementsByClassName("form-statuses");
    for (var i = 0; i < formImages.length; i++)
    {
        console.log(formImages[i]);
    }
}

function resetPage()
{
    formImages = document.getElementsByClassName("form-statuses");
    checkBoxes = document.getElementsByClassName("check-box");
    for (var i = 0; i < checkBoxes.length; i++)
    {
        if(checkBoxes[i].checked != true)
        {
            checkBoxes[i].click();
        }
       if(document.getElementById(checkBoxes[i].id.split("-")[0]).value != "1")
       {
            document.getElementById(checkBoxes[i].id.split("-")[0]).value = "1"
            updatePrice(document.getElementById(checkBoxes[i].id.split("-")[0]).value,
                        document.getElementById(checkBoxes[i].id.split("-")[0]).id);
       }
        
    }

    updatePrices();
    for (var i = 0; i < formImages.length; i++)
    {
        formImages[i].style.visibility = "hidden";
    }
    
}