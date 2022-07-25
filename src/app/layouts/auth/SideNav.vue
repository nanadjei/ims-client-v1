<template>
    <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            <!-- Sidebar - Brand -->
            <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
            <div class="sidebar-brand-icon rotate-n-15">
                <i class="fas fa-laugh-wink"></i>
            </div>
            <div class="sidebar-brand-text mx-3">Douginas<sup></sup></div>
            </a>

            <!-- Divider -->
            <hr class="sidebar-divider my-0">

            <!-- Nav Item - Dashboard -->
            <li class="nav-item">
            <a class="nav-link cursor-pointer" @click="navigateToRouter({'name': 'dashboard'})">
                <i class="fas fa-fw fa-tachometer-alt"></i>
                <span>Dashboard</span></a>
            </li>

            <!-- Divider -->
            <hr class="sidebar-divider">

            <!-- Heading -->
            <div class="sidebar-heading">
            Inventory
            </div>

            <!-- Nav Item - Pages Collapse Menu -->
            <li class="nav-item">
              <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#cash" aria-expanded="true"
                  aria-controls="cash">
                  <i class="fas fa-cash-register"></i>
                  <span>Cash</span>
              </a>
              <div id="cash" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                  <div class="bg-white py-2 collapse-inner rounded">
                  <!-- <h6 class="collapse-header">Custom Components:</h6> -->
                  <a class="collapse-item cursor-pointer" @click="navigateToRouter({'name': 'cash-sales'})">Cash Sales</a>
                  <a class="collapse-item cursor-pointer"  @click="navigateToRouter({'name': 'sales-report'})">Sales Report</a>
                  </div>
              </div>
            </li>

            <li class="nav-item">
              <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#inventory" aria-expanded="true"
                  aria-controls="inventory">
                  <i class="fab fa-product-hunt"></i>
                  <span>Inventory</span>
              </a>
              <div id="inventory" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                  <div class="bg-white py-2 collapse-inner rounded">
                    <a class="collapse-item cursor-pointer" @click="navigateToRouter({'name': 'products'})">Products</a>
                  </div>
              </div>
            </li>

            <li class="nav-item">
              <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#restock" aria-expanded="true"
                  aria-controls="restock">
                  <i class="fas fa-redo"></i>
                  <span>Restock</span>
              </a>
              <div id="restock" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                  <div class="bg-white py-2 collapse-inner rounded">
                  <a class="collapse-item cursor-pointer" @click="navigateToRouter({'name': 'stockout'})">Stock Out</a>
                    <!-- <a class="collapse-item cursor-pointer" @click="navigateToRouter({'name': 'restock'})">Restock</a> -->
                    <a class="collapse-item cursor-pointer" @click="navigateToRouter({'name': 'replenished-items'})">Replenished Items</a>
                  </div>
              </div>
            </li>

            <!-- Divider -->
        <hr class="sidebar-divider d-none d-md-block">

      </ul> 
</template>
<script>
export default {
  name: "SideNav",
  methods: {
    /** Route to a specific component
     * @var object routerName  - Eg; {'name': 'dashboard'}
     */
    navigateToRouter(route) {
      if (this.$route.name !== route.name) this.$router.push(route);
    }
  }
};
</script>