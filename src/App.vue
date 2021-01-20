<template>
  <div id="app">
    <el-container class='mainContainer'>
      <el-header>
        <Header></Header>
      </el-header>
      <el-container>
        <el-aside width="25%">
          <AsideLeft></AsideLeft>
        </el-aside>
        <el-main>
          <Content></Content>
        </el-main>
        <el-aside width="25%">
          <AsideRight></AsideRight>
        </el-aside>
      </el-container>
      <el-footer>
        <Footer></Footer>
      </el-footer>
    </el-container>
  </div>
</template>

<script>

import Header from './views/Header'
import Content from './views/Content'
import AsideLeft from './views/AsideLeft'
import AsideRight from './views/AsideRight'
import Footer from './views/Footer'
export default {
  name: 'App',
  components: {
    Header,
    Content,
    AsideLeft,
    AsideRight,
    Footer
  }
}
</script>

<style lang="scss">
#app {
  width: 1024px;
  position: relative;
  margin: 20px auto;
  .mainContainer {
    border-radius: 15px;
    overflow: hidden;
    .el-header {
      background-color: #12a1df;
    }
    .el-container {
      height: 500px;
      overflow: hidden;
      background-image: -webkit-linear-gradient(
        to top right,
        #bf8868,
        #e6d9c9,
        #6ba3c9
      );
      background-image: -moz-linear-gradient(
        to top right,
        #bf8868,
        #e6d9c9,
        #6ba3c9
      );
      background-image: linear-gradient(
        to top right,
        #bf8868,
        #e6d9c9,
        #6ba3c9
      );

      .el-main {
        width: 50%;
        display: flex;
        min-width: 300px;
        justify-content: center;

        border-right: 2px solid;
        border-left: 2px solid;
        border-image: -webkit-linear-gradient(transparent, #aaf, transparent) 1
          10 1; /* 控制边框颜色渐变 */
        border-image: -moz-linear-gradient(transparent, #aaf, transparent) 1 10
          1;
        border-image: linear-gradient(transparent, #aaf, transparent) 1 10 1; /* 标准的必须写在最后 */
      }
      .el-aside {
        min-width: 250px;
        height: inherit;
        overflow: hidden;
      }
    }
    .el-footer {
      position: absolute;
      width: 80%;
      margin: 0 10%;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
    }
  }
}
</style>
