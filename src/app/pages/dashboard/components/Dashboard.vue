<template>
  <auth-layout>
    <h1 class="h3 mb-4 text-gray-800" slot="heading">Dashboard</h1>
    <div slot="content">
      <!-- Content here -->
      <div class="row" v-if="getDashData">
        <div class="col-xl-3 col-md-6 col-mb-4">
          <card
            type="primary"
            heading="Total Sales (today)"
            :data="getDashData.daily_sales"
          ></card>
        </div>
        <!-- Show only when super admin -->
          <div v-show="isSuperAdmin" class="col-xl-3 col-md-6 col-mb-4">
            <card
              type="info"
              heading="Total This Month"
              :data="getDashData.monthly_sales"
            ></card>
          </div>
          <div v-show="isSuperAdmin" class="col-xl-3 col-md-6 col-mb-4">
            <card
              type="success"
              heading="Total This Year"
              :data="getDashData.yearly_sales"
            ></card>
          </div>
        <!-- Stop here -->
      </div>
    </div>
  </auth-layout>
</template>

<script>
import Spatie from "@/app/helpers/Spatie";
import AuthLayout from "@/app/layouts/auth/Layout";
import Card from "@/app/pages/dashboard/reuseables/Card";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Dashboard",
  components: { AuthLayout, Card },
  computed: {
    ...mapGetters({
      getDashData: "dashboard/getDashboardData",
    }),
    isSuperAdmin() {
      return new Spatie().userHasRole('super admin');
    }
  },
  methods: {
    ...mapActions({
      fetchDashboardData: "dashboard/fetchDashboardData",
    }),
  },
  created() {
    this.fetchDashboardData();
  }
};
</script>
