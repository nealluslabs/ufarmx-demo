import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';

//SUPERADMIN PAGES
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import HomePage from './pages/HomePage';

import RegisterPage from './pages/RegisterPage';

import StudentPage from './pages/StudentPage';

import PitchesPage from './pages/PitchesPage';

import ProfilePage from './pages/ProfilePage';


import LogoutPage from './pages/LogoutPage';

import CropProfilePage from './pages/CropProfilePage';
import FarmerProfilePage from './pages/FarmerProfilePage';
import ContainersPage from './pages/ContainersPage';
import ContainerProfilePage from './pages/ContainerProfilePage';
import AgentProfilePage from './pages/AgentProfilePage';
import AddDepositPage from './pages/AddDepositPage';
import ResponsesPage from './pages/ResponsesPage';
import ViewResponsePage from './pages/ViewResponsesPage';
import AddFarmerPage from './pages/AddFarmerPage';
import AddAgentPage from './pages/AddAgentPage';


//AGENT PAGES
import HomePageAgent from './pages/HomePageAgent';
import LoginPageAgent from './pages/LoginPageAgent';
import AllFarmersOneAgentPage from './pages/AllFarmersOneAgentPage';
import LoginPageFarmer from './pages/LoginPageFarmer';
import HomePageFarmer from './pages/HomePageFarmer';
import FarmerProductsPage from './pages/FarmerProductsPage';
import DepositsPage from './pages/DepositsPage';
import SettingsPage from './pages/SettingsPage';
import ViewFormsPage from './pages/ViewFormsPage';
import FormsPage from './pages/FormsPage';
import ResponsesPageRegMgr from './pages/ResponsesPageRegMgr';
import ContainersPageRegMgr from './pages/ContainersPageRegMgr';
import HomePageRegMgr from './pages/HomePageRegMgr';
import PitchesPageRegMgr from './pages/PitchesPageRegMgr';
import StudentPageRegMgr from './pages/StudentPageRegMgr';
import FormsPageRegMgr from './pages/FormsPageRegMgr';
import FillFormsPage from './pages/FillFormsPage';
import FarmerIntakeFillFormsPage from './pages/FarmerIntakeFillFormsPage';
import AdminsPage from './pages/AdminsPage';
import ProductsPage from './pages/ProductsPage';
import FarmersProductsPage from './pages/FarmersProductsPage';
import AddAdminPage from './pages/AddAdminPage';
import AddSuperAdminPage from './pages/AddSuperAdminPage';
import FarmerFollowUpFillFormsPage from './pages/FarmerFollowUpFillFormsPage';
import FarmerInputFillFormsPage from './pages/FarmerInputFillFormsPage';
import FarmerProduceFillFormsPage from './pages/FarmerProduceFillFormsPage';
import FarmerInputUpdatePage from './pages/FarmerInputUpdatePage';
import FarmerCreditAnalysisFormsPage from './pages/FarmeCreditAnalysisFormsPage';
import AddNewProductPage from './pages/AddNewProductPage';
import FarmerHarvestCycleFormsPage from './pages/FarmerHarvestCycleFormsPage';
import MarketInsightsPage from './pages/MarketInsightsPage';
import HarvestInputFormPage from './pages/HarvestFormPage';
import CreditScorePage from './pages/CreditScorePage';


export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/" />, index: true },
        { path: 'home', element: <HomePage /> },
        { path: 'home-regmgr', element: <HomePageRegMgr /> },
        { path: 'home-agent', element: <HomePageAgent /> },
        { path: 'home-farmer', element: <HomePageFarmer /> },
       
        { path: 'credit-score', element: <CreditScorePage /> },
        { path: 'deposits', element: <StudentPage /> },
        { path: 'deposits-regmgr', element: <StudentPageRegMgr /> },
        { path: 'deposits-farmer', element: <DepositsPage /> },
        { path: 'add-deposit', element: <AddDepositPage /> },
        { path: 'add-farmer', element:  <FarmerIntakeFillFormsPage /> },
        { path: 'add-agent', element: <AddAgentPage /> },
        { path: 'add-admin', element: <AddAdminPage /> },
        { path: 'add-superadmin', element: <AddSuperAdminPage /> },
        
        { path: 'crop-profile', element: <CropProfilePage /> },
        { path: 'farmer-profile', element: <FarmerProfilePage /> },
        { path: 'farmer-products', element: <FarmersProductsPage /> },
        {/* path: 'agent-profile', element: <AgentProfilePage /> */},

        { path: 'agent-profile',element: <AgentProfilePage /> ,


        children: [
          {path: ':page',  element: <AgentProfilePage /> }
        ]
  },

  { path: 'farmer-settings', element: <SettingsPage /> },
  { path: 'farmers-products', element: <FarmersProductsPage /> },

        { path: 'profile', element: <ProfilePage /> },

        { path: 'market-insights', element: <MarketInsightsPage /> },
        
        { path: 'containers', element: <ContainersPage /> },
        { path: 'containers-regmgr', element: <ContainersPageRegMgr /> },

        { path: 'container-profile', element: <ContainerProfilePage /> },

        { path: 'admins',element: <AdminsPage /> },

        { path: 'products',element: <ProductsPage />} ,


        { path: 'farmers',element: <PitchesPage /> ,

        


            children: [
              {path: ':page',  element: <PitchesPage /> }
            ]
      },

      { path: 'products-regmgr',element: <PitchesPageRegMgr /> },



       

      { path: 'all-farmers-one-agent',element: <AllFarmersOneAgentPage /> ,


      children: [
        {path: ':page',  element: <AllFarmersOneAgentPage /> }
      ]
},
     { path: 'forms',element: <FormsPage /> },

     { path: 'forms-regmgr',element: <FormsPageRegMgr /> },

      { path: 'responses',element: <ResponsesPage /> ,


      children: [
        {path: ':page',  element: <ResponsesPage /> }
      ]
   },
   { path: 'responses-regmgr',element: <ResponsesPageRegMgr /> },
   { path: 'view-response', element: <ViewResponsePage /> },
   { path: 'view-form', element: <ViewFormsPage /> },
   { path: 'fill-form', element: <FillFormsPage /> },
   { path: 'farmer-follow-up-fill-form', element: <FarmerFollowUpFillFormsPage /> },
   { path: 'farmer-input-fill-form', element: <FarmerInputFillFormsPage /> },
   { path: 'harvest-input-fill-form', element: <HarvestInputFormPage /> },
   { path: 'farmer-harvest-cycle-form', element: <FarmerHarvestCycleFormsPage /> },
   { path: 'farmer-credit-analysis-form', element: <FarmerCreditAnalysisFormsPage /> },
   { path: 'farmer-produce-fill-form', element: <FarmerProduceFillFormsPage /> },
   { path: 'farmer-input-update', element: <FarmerInputUpdatePage /> },
   { path: 'farmers-intake-fill-form', element: <FarmerIntakeFillFormsPage /> },

   

   { path: 'add-new-product', element: <AddNewProductPage /> },

      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'login-agent',
      element: <LoginPageAgent />,
    },
    {
      path: 'login-farmer',
      element: <LoginPageFarmer />,
    },
    {
      path: 'logout',
      element: <LogoutPage />,
    },
  
    {
      path: 'register',
      element: <RegisterPage />,
    },
    {/*
      path: '/',
      index: true, 
      element: <WelcomePage />,
  */},
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/login" />, index: true },
        { element: <Navigate to="/dashboard/home" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
