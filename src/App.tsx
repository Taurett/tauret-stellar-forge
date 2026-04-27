import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import { CartProvider } from "@/contexts/CartContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { PaymentTestModeBanner } from "./components/PaymentTestModeBanner";
import ErrorBoundary from "./components/ErrorBoundary";
import MobileBottomNav from "./components/MobileBottomNav";
import AIChatWidget from "./components/AIChatWidget";
import CompareTray from "./components/CompareTray";

// Code-split routes — keeps the initial bundle (Index/landing) lean.
const Index           = lazy(() => import("./pages/Index"));
const Shop            = lazy(() => import("./pages/Shop"));
const Cart            = lazy(() => import("./pages/Cart"));
const ProductDetail   = lazy(() => import("./pages/ProductDetail"));
const Auth            = lazy(() => import("./pages/Auth"));
const CheckoutReturn  = lazy(() => import("./pages/CheckoutReturn"));
const Orders          = lazy(() => import("./pages/Orders"));
const OrderDetail     = lazy(() => import("./pages/OrderDetail"));
const AdminOrders     = lazy(() => import("./pages/AdminOrders"));
const AdminInventory  = lazy(() => import("./pages/AdminInventory"));
const AdminShipping   = lazy(() => import("./pages/AdminShipping"));
const AdminReturns    = lazy(() => import("./pages/AdminReturns"));
const AdminAnalytics  = lazy(() => import("./pages/AdminAnalytics"));
const Wishlist        = lazy(() => import("./pages/Wishlist"));
const AdminReviews    = lazy(() => import("./pages/AdminReviews"));
const Help            = lazy(() => import("./pages/Help"));
const Compare         = lazy(() => import("./pages/Compare"));
const SharedWishlist  = lazy(() => import("./pages/SharedWishlist"));
const AdminQA         = lazy(() => import("./pages/AdminQA"));
const AdminBundles    = lazy(() => import("./pages/AdminBundles"));
const NotFound        = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

// Minimal route fallback — matches the dark base background to avoid flash.
const RouteFallback = () => (
  <div className="min-h-screen bg-background" aria-hidden="true" />
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <CurrencyProvider>
          <BrowserRouter>
            <AuthProvider>
              <CartProvider>
                <TooltipProvider>
                  <PaymentTestModeBanner />
                  <Toaster />
                  <Sonner />
                  <ErrorBoundary>
                    <Suspense fallback={<RouteFallback />}>
                      <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/shop" element={<Shop />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/product/:id" element={<ProductDetail />} />
                        <Route path="/auth" element={<Auth />} />
                        <Route path="/checkout/return" element={<CheckoutReturn />} />
                        <Route path="/orders" element={<Orders />} />
                        <Route path="/orders/:id" element={<OrderDetail />} />
                        <Route path="/admin/orders" element={<AdminOrders />} />
                        <Route path="/admin/inventory" element={<AdminInventory />} />
                        <Route path="/admin/shipping" element={<AdminShipping />} />
                        <Route path="/admin/returns" element={<AdminReturns />} />
                        <Route path="/admin/analytics" element={<AdminAnalytics />} />
                        <Route path="/admin/reviews" element={<AdminReviews />} />
                        <Route path="/admin/qa" element={<AdminQA />} />
                        <Route path="/admin/bundles" element={<AdminBundles />} />
                        <Route path="/wishlist" element={<Wishlist />} />
                        <Route path="/wishlist/shared/:token" element={<SharedWishlist />} />
                        <Route path="/help" element={<Help />} />
                        <Route path="/compare" element={<Compare />} />
                        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </Suspense>
                  </ErrorBoundary>
                  <CompareTray />
                  <AIChatWidget />
                  <MobileBottomNav />
                </TooltipProvider>
              </CartProvider>
            </AuthProvider>
          </BrowserRouter>
        </CurrencyProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
