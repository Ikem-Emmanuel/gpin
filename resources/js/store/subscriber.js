import store from "./index";
import axios from "axios";

store.subscribe(mutation => {
    switch (mutation.type) {
        case "auth/SET_TOKEN":
            if (mutation.payload) {
                axios.defaults.headers.common[
                    "Authorization"
                    ] = `Bearer ${mutation.payload}`;
                localStorage.setItem("token", mutation.payload); //save the token in our local storage
            } else {
                axios.defaults.headers.common["Authorization"] = null;
                localStorage.removeItem("token"); //remove the token in our local storage
            }
            break;
    }
});
