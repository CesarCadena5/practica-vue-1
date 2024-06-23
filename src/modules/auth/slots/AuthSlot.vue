<template>
    <section class="auth">
        <img class="wave" src="@/assets/svgs/wave-auth.svg" :alt="title">
        <div class="container">
            <div class="img animate__animated animate__fadeIn">
                <img :src="srcImg" :alt="title">
            </div>
            <div class="login-container animate__animated animate__fadeIn">
                <form @submit.prevent="handleAuth">
                    <slot name="form-information"/>
                    <div class="input-div input-one">
                        <div class="svg">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                        </div>
                        <div>
                            <h5>Email</h5>
                            <input type="email" class="input" @input="handleChangeEmail">
                            <span class="msg-error" v-if="!!emailError">{{ emailError }}</span>
                        </div>
                    </div>
                    <div class="input-div input-two">
                        <div class="svg">
                            <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Layer_2" data-name="Layer 2"> <g id="invisible_box" data-name="invisible box"> <rect width="48" height="48" fill="none"></rect> </g> <g id="Layer_7" data-name="Layer 7"> <path d="M39,18H35V13A11,11,0,0,0,24,2H22A11,11,0,0,0,11,13v5H7a2,2,0,0,0-2,2V44a2,2,0,0,0,2,2H39a2,2,0,0,0,2-2V20A2,2,0,0,0,39,18ZM15,13a7,7,0,0,1,7-7h2a7,7,0,0,1,7,7v5H15ZM14,35a3,3,0,1,1,3-3A2.9,2.9,0,0,1,14,35Zm9,0a3,3,0,1,1,3-3A2.9,2.9,0,0,1,23,35Zm9,0a3,3,0,1,1,3-3A2.9,2.9,0,0,1,32,35Z"></path> </g> </g> </g></svg>
                        </div>
                        <div>
                            <h5>Password</h5>
                            <input type="password" class="input" @input="handleChangePassword">
                            <span class="msg-error" v-if="!!passwordError">{{ passwordError }}</span>
                        </div>
                    </div>
                    <slot name="form-route"/>
                    <input type="submit" class="btn" :value="title">
                </form>
            </div>
            <section v-if="loading" class="loading">
                <Loading/>
            </section>
            <section v-if="messageError" class="messageError">
                <h2>{{ messageError }}</h2>
            </section>
        </div>
    </section>
</template>

<script src="./AuthSlot.js"></script>

<style>
.auth .wave {
    position: fixed;
    height: 100%;
    left: 0;
    bottom: 0;
    z-index: -1;
}

.auth .container {
    width: 100%;
    height: 100vh;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 7rem;
    padding: 0 2rem;
}

.auth .img {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.auth .img img {
    width: 500px;
}

.auth .login-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    text-align: center;
}

.auth form {
    width: 360px;
}

.auth .avatar {
    width: 100px;
}

.auth form h2 {
    font-size: 2.9rem;
    text-transform: uppercase;
    margin: 15px 0;
    color: #333;
}

.auth .input-div {
    position: relative;
    display: grid;
    grid-template-columns: 7% 93%;
    margin: 35px 0;
    padding: 5px 0;
    border-bottom: 2px solid #d9d9d9;
}

.auth .input-div::after,
.auth .input-div::before {
    content: '';
    position: absolute;
    bottom: -2px;
    width: 0;
    height: 2px;
    background-color: #38d39f;
    transition: .3s;
}

.auth .input-div::after {
    right: 50%;
}

.auth .input-div::before {
    left: 50%;
}

.auth .input-div.focus>.svg>svg {
    fill: #38d39f;
}

.auth .input-div.focus div h5 {
    top: -5px;
    font-size: 15px;
}

.auth .input-div.focus::after,
.auth .input-div.focus::before {
    width: 50%;
}

.auth .input-div.input-one {
    margin-top: 0;
}

.auth .input-div.input-two {
    margin-top: 4px;
}

.auth .msg-error {
    position: absolute;
    top: 3.5rem;
    left: 0;
}

.auth .svg {
    display: flex;
    justify-content: center;
    align-items: center;
}

.auth .svg svg {
    transition: .3s;
}

.auth .input-div>div {
    position: relative;
    height: 45px;
}

.auth .input-div>div h5 {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #999;
    font-size: 18px;
    transition: .3s;
}

.auth .input {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border: none;
    outline: none;
    background: none;
    padding: 0.5rem 0.7rem;
    font-size: 1.2rem;
    color: #555;
}

.auth a {
    display: block;
    text-align: right;
    text-decoration: none;
    color: #878286;
    font-size: 0.9rem;
    font-weight: 600;
    transition: .3s;
}

.auth a:hover {
    color: #38d39f;
}

.auth .btn {
    display: block;
    width: 100%;
    height: 50px;
    border-radius: 25px;
    margin: 1rem 0;
    font-size: 1.2rem;
    outline: none;
    border: none;
    background-image: linear-gradient(to right, #ffdc68, #fde38d, #f8c727);
    cursor: pointer;
    color: #555;
    font-weight: bold;
    text-transform: uppercase;
    background-size: 200%;
    transition: .5s;
}

.auth .btn:hover {
    background-position: right;
}

@media screen and (max-width: 1050px) {
    .auth .container {
        grid-gap: 5rem;
    }
}

@media screen and (max-width: 1000px) {
    .auth form {
        width: 290px;
    }

    .auth form h2 {
        font-size: 2.4rem;
        margin: 8px 0;
    }

    .auth .img img {
        width: 400px;
    }
}

@media screen and (max-width: 900px) {
    .auth .img {
        display: none;
    }

    .auth .container {
        grid-template-columns: 1fr;
    }

    .auth .wave {
        display: none;
    }

    .auth .login-container {
        justify-content: center;
    }
}

.messageError {
    position: absolute;
    bottom: 3rem;
    left: 0;
    width: 100%;
    text-align: center;
}
</style>