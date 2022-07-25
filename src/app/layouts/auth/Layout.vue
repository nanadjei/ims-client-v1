<template>
<div id="page-top">

    <!-- Page Wrapper -->
    <div id="wrapper">

      <!-- Sidebar -->
        <side-nav></side-nav>
      <!-- End of Sidebar -->

      <!-- Content Wrapper -->
      <div id="content-wrapper" class="d-flex flex-column">

        <!-- Main Content -->
        <div id="content">

          <!-- Topbar -->
            <top-nav></top-nav>
          <!-- End of Topbar -->

          <!-- Begin Page Content -->
          <div class="container-fluid">

            <!-- Page Heading -->
              <slot name="heading"></slot>
            
              <slot name="content"></slot>
          </div>
          <!-- /.container-fluid -->

        </div>
        <!-- End of Main Content -->

        <!-- Footer -->
        <footer class="sticky-footer bg-white">
          <div class="container my-auto">
            <div class="copyright text-center my-auto">
              <span>Copyright &copy; Douginas Cosmetics {{ new Date().getFullYear() }}</span>
            </div>
          </div>
        </footer>
        <!-- End of Footer -->

      </div>
      <!-- End of Content Wrapper -->

    </div>
    <!-- End of Page Wrapper -->

    <!-- Scroll to Top Button-->
    <a class="scroll-to-top rounded" href="#page-top">
      <i class="fas fa-angle-up"></i>
    </a>

    <!-- Logout Modal-->
    <div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">Select "Logout" below if you are ready to end your current session.</div>
          <div class="modal-footer">
            <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
            <a class="btn btn-primary" href="javascript:void(0)" @click="handleLogout">Logout</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideNav from "@/app/layouts/auth/SideNav";
import TopNav from "@/app/layouts/auth/TopNav";
import { logout } from "@/app/helpers/authentication";
export default {
  name: "AuthLayout",
  components: { SideNav, TopNav },
  methods: {
    /** Remove user from local storage and cookies */
    handleLogout() {
      logout();
      document.getElementsByClassName("modal-backdrop")[0].remove();
      $('#logoutModal').modal('hide');
      return this.$router.push({ name: "login" });
    }
  }
};
</script>