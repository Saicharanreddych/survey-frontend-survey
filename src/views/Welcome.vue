<template>
<h1>Welcome</h1><h2>{{username}}</h2>

</template>
<script>
export default{
data() {
    return{
        username:localStorage.getItem("username")
    }
}}
</script>