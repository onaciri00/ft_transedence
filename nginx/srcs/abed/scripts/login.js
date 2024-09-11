
const singUp = document.querySelector("#signup");
const singIn = document.querySelector("#signin")
const one = document.querySelector("#one");
const two = document.querySelector("#two");
const three = document.querySelector("#three");

function singUp_function(event)
{
    event.preventDefault();
    one.style.display = "none";
    three.style.display = "block";
}

function singIn_function(event)
{
    event.preventDefault();
    // add class so the transition can work probably;
    three.style.display = "none";
    one.style.display = "block";
}

singUp.addEventListener("click", singUp_function);
singIn.addEventListener("click", singIn_function);

import { get_csrf_token, showHome } from "./register.js";
// import { profileFunction } from "./profile.js";
import { reloadFunction } from "../script.js";
export let dataObject;

// document.addEventListener("DOMContentLoaded", () => {

    const updateData = async () => {
        if(localStorage.getItem("isLoggedIn") === "true")
        {
            try {
                const response = await fetch('/user/get_user_info/');
                if (response.ok) {
                    const jsonResponse = await response.json();
                    if (jsonResponse.status === "success") {
                        dataObject = jsonResponse.data;
                        reloadFunction(dataObject);
                    }
                }
            } catch(err) {
                console.error(err);
            }
        }
    }
    updateData();
    const loginForm = document.querySelector("#login-form");

    const loginFunction = async (event) => {
        event.preventDefault();
        const token =  await get_csrf_token();
        try {
            const formData = new FormData(loginForm);
            const response = await fetch('/login/', {
                method: 'POST',
                headers: {
                    'X-CSRFToken': token,
                },
                body: formData
            });
            if (response.ok) {
                const jsonResponse = await response.json();
                if (jsonResponse.status === "success") {
                    showHome(jsonResponse.data);
                    localStorage.setItem('isLoggedIn', 'true');
                }
                return jsonResponse.data;
            }
        }
        catch(err) {
            console.error(err);
        }
    }
    loginForm.addEventListener("submit", loginFunction);
// });
