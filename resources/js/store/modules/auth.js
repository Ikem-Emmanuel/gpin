import axios from "axios";
export default {
    namespaced: true,
    state: {
        token: null,
        user: null,
        studentDetails: {}
    },

    /*
     * This getters check if we are authenticated and then returns the authenticated user information from our store
     */
    getters: {
        authenticated(state) {
            return state.token && state.user;
        },
        user(state) {
            return state.user;
        },
        studentDetails(state) {
            return state.studentDetails;
        }
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token;
        }, //this will set the dispatch method and commit the token to the state

        SET_USER(state, data) {
            state.user = data;
        } ,//this will set the dispatch method and commit the user data to the state

        SET_STUDENT_DETAILS(state, data) {
            state.studentDetails = data;
        } //this will set the dispatch method and commit the user data to the state
    },
    actions: {
        /*
         * Here we sign you in
         * Return the token without authenticating it

         */
        async logIn({ dispatch }, credentials) {
            let response = await axios.post("api/login", credentials);

            return dispatch("attempt", response.data.token);
        },

        Register({ commit }, credentials) {
            return axios.post("api/auth/register", credentials);
        },

        /**
         * Here we check if the token is valid then we SET_TOKEN == token,
         * Also send a request to the api(auth/me) with the authosization token
         * it commits the data we get back and SET_USER to that data we get from the me api and store it in our state
         * But if it fails it cathes and consoles consoles the error message failed but in reality we set the state to a default point of null
         */
        async attempt({ commit, state }, token) {
            //this is to prevent the application from call the auth api everytime on a page page
            if (token) {
                commit("SET_TOKEN", token);
            }

            if (!state.token) {
                return
            }

            //if state token is empty the attempt method braks

            try {
                let response = await axios.get("api/auth/user");
                commit("SET_USER", response.data);
            } catch (e) {
                commit("SET_TOKEN", null);
                commit("SET_USER", null);
                // console.log("failed");
            }

        },
        async getStudentDetails({ commit, state }, input,) {
            if (!state.token) {
               return
            } try {
                await axios.get(`api/auth/details?examNo=${input}`)
                    .then(response => {
                        commit("SET_STUDENT_DETAILS", response.data);
                    });
            }catch (e) {
                console.log("failed");
            }
        },
        logOut({ commit }) {
            return axios.post("api/auth/logout").then(() => {
                commit("SET_TOKEN", null);
                commit("SET_USER", null);
            });
        }
    }
};
