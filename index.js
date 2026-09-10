
const users = [
    {
        id: 1,
        first_name: "Abdul",
        last_name: "Alim",
        username: "alim3434",
        email: "aalim@deqode.com",
        gender: "male",
        role: "admin",
        password: "alim@123"
    },
    {
        id: 2,
        first_name: "John",
        last_name: "Doe",
        username: "johndoe",
        email: "john@example.com",
        gender: "male",
        role: "sales",
        password: "john123"
    },
    {
        id: 3,
        first_name: "Jane",
        last_name: "Smith",
        username: "janesmith",
        email: "jane@example.com",
        gender: "female",
        role: "operations",
        password: "jane123"
    },
    {
        id: 4,
        first_name: "Robert",
        last_name: "Brown",
        username: "robertbrown",
        email: "robert@example.com",
        gender: "male",
        role: "admin",
        password: "robert123"
    },
    {
        id: 5,
        first_name: "Emily",
        last_name: "Johnson",
        username: "emilyjohnson",
        email: "emily@example.com",
        gender: "female",
        role: "sales",
        password: "emily123"
    },
    {
        id: 6,
        first_name: "Michael",
        last_name: "Williams",
        username: "michaelw",
        email: "michael@example.com",
        gender: "male",
        role: "operations",
        password: "michael123"
    },
    {
        id: 7,
        first_name: "Sophia",
        last_name: "Taylor",
        username: "sophiataylor",
        email: "sophia@example.com",
        gender: "female",
        role: "sales",
        password: "sophia123"
    },
    {
        id: 8,
        first_name: "David",
        last_name: "Miller",
        username: "davidmiller",
        email: "david@example.com",
        gender: "male",
        role: "admin",
        password: "david123"
    }
];

const create_user = document.getElementById("create-user");
const login_user = document.getElementById("login");
const user_list = document.getElementById("user-list");

const signup_screen = document.getElementById("signup-section");
const login_screen = document.getElementById("login-section");
const login_redirect = document.getElementById("login-redirect");
const signup_redirect = document.getElementById("signup-redirect");
console.log(login_screen);
const dashboard_screen = document.getElementById("user-dasboard");
create_user.addEventListener("submit", fun_create_user);
login_user.addEventListener("submit", fun_login_user);
login_redirect.addEventListener("click", display_login_screen);
signup_redirect.addEventListener("click", display_signup_screen);


function fun_create_user(e) {
    e.preventDefault();

    const first_name = document.getElementById("first-name").value;
    const last_name = document.getElementById("last-name").value;
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const err_con = document.getElementById("signup-error-msg");
     const gender = document.querySelector(
        'input[name="gender"]:checked'
    ).value;

    const role = document.getElementById("role").value;
 err_con.innerHTML = "";
    if (first_name.trim() === "") {
        err_con.innerHTML = "First name is required";
        return;
    }

    if (last_name.trim() === "") {
        err_con.innerHTML = "Last name is required";
        return;
    }

    if (email.trim() === "") {
        err_con.innerHTML = "Email is required";
        return;
    }

    if (username.trim() === "") {
        err_con.innerHTML = "Username is required";
        return;
    }

    if (!gender) {
        err_con.innerHTML = "Please select your gender";
        return;
    }

    if (role === "") {
        err_con.innerHTML = "Please select a role";
        return;
    }

    if (password.trim() === "") {
        err_con.innerHTML = "Password is required";
        return;
    }
    if (!/^[A-Za-z0-9_]{3,20}$/.test(username)) {
err_con.innerHTML = "sername must be 3-20 characters and contain only letters, numbers, and underscores.";
return;
    }

    const existing_user = users.find((user) => {
        return user.email === email.trim();
    });

     if (existing_user) {
        err_con.innerHTML = "This email is already registered";
        return;
    }

    const exit_username = users.find((user) => {
          return user.username == username;
    })
    if (exit_username) {
        err_con.innerHTML = "This username is already registered";
        return;
    }
    console.log(first_name);

    
   

    const user = {
        id: users.length + 1,
        first_name: first_name,
        last_name: last_name,
        username: username,
        email: email,
        gender: gender ? gender : "",
        role: role,
        password: password
    };

    users.push(user);
    create_user.reset();
   alert("User account created successfully!");
   console.log(users);
    display_login_screen();
    
}

function fun_login_user(e){
 e.preventDefault();
 const email = document.getElementById("login-email").value;
 const password = document.getElementById("login-password").value;

 if(email.trim() == '' || password.trim() == ''){
    alert("Email and password required");
    return
 }

 const check_user = users.find((user)=>{
    return user.email == email
 })
console.log(check_user);
 if(!check_user){
    alert("User not found");
    return
 }

 if(check_user.password !== password)
 {
    alert("Password does not match");
    return
 }

 alert("login successfuly");
 fun_display_users(check_user);
 
}

function fun_display_users(user){
let content = '';

let filter_users = fun_filter_users(user.role);


console.log(filter_users);
user_list.innerHTML = "";
filter_users.map((user)=>{
     const tr = document.createElement("tr");
    tr.innerHTML = `
            <td>${user.id}</td>
            <td>${user.first_name}</td>
            <td>${user.last_name}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.gender}</td>
            <td>${user.role}</td>
            <td>
                <a href="/users/1/edit">
                    <button type="button">Edit</button>
                </a>

                <form action="/users/1/delete" method="POST" style="display: inline;">
                    <button
                        type="submit"
                        onclick="return confirm('Are you sure you want to delete this user?')"
                    >
                        Delete
                    </button>
                </form>
            </td>`;
            user_list.appendChild(tr);
});

display_dashboard_screen();

}

function fun_filter_users(role){
    if(role == 'admin')
    {
        return users;
    }
    else if(role == 'operations'){
        return users.filter((uesr)=>{
            return user.role != 'admin';
        })
    }
    else if(role == 'sales')
    {
        return users.filter((user)=>{
            return user.role != 'admin' && user.role != 'operations';
        })
    }
}



function display_login_screen(){
login_screen.classList.add('active');

signup_screen.classList.remove('active');
dashboard_screen.classList.remove('active');
}

function display_signup_screen(){
login_screen.classList.remove('active');

signup_screen.classList.add('active');
dashboard_screen.classList.remove('active');
}

function display_dashboard_screen(){
login_screen.classList.remove('active');

signup_screen.classList.remove('active');
dashboard_screen.classList.add('active');
}