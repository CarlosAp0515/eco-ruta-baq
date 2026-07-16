export function registerUser() {

    const form = document.getElementById("registerForm");


    if (!form) {
        console.error("No se encontró el formulario de registro");
        return;
    }


    form.addEventListener("submit", (event) => {

        event.preventDefault();


        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();


        if(password.length < 8){

            alert("La contraseña debe tener mínimo 8 caracteres");
            return;

        }


        const user = {
            name,
            email,
            password
        };


        console.log("Usuario capturado:", user);


    });

}