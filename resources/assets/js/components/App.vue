<template>
   <div class="sufee-login d-flex align-content-center flex-wrap">
        <div class="container">
            <div class="login-content">
                <div class="login-logo">
                    <a href="index.html">
                        <img class="align-content" src="images/logo.png" alt="">
                    </a>
                </div>
                <div class="login-form">
                    <form>
                        <div class="form-group">
                            <label>Email address</label>
                            <input type="email" class="form-control" placeholder="Email">
                        </div>
                        <div class="form-group">
                            <label>Password</label>
                            <input type="password" class="form-control" placeholder="Password">
                        </div>
                        <div class="checkbox">
                            <label class="pull-right">
                                <a href="#">Olvidó su contraseña?</a>
                            </label>

                        </div>
                         <router-link to="/modulo">Modulo</router-link>
                        <button type="submit" class="btn btn-success btn-flat m-b-30 m-t-30">Iniciar sesión</button>
                    </form>
                </div>
            </div>
        </div>
        
    </div>
</template>
<script>
        export default {
            data(){
                return{

                }
            },
            mounted() {              
                
            let login = document.createElement('script')
            login.setAttribute('src', 'assets/js/lib/data-table/login-init.js')
            document.head.appendChild(login)

            }
        }
</script>
