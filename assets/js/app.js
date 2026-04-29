(function () {
  "use strict";

  const STORAGE_KEY = "metrotrust_fms_robust_v1";
  const SESSION_KEY = "metrotrust_fms_session_v1";

  const iconPaths = {
    "activity": '<path d="M3 12h4l3-8 4 16 3-8h4"></path>',
    "banknote": '<rect x="3" y="6" width="18" height="12" rx="2"></rect><circle cx="12" cy="12" r="2"></circle><path d="M7 10v4M17 10v4"></path>',
    "briefcase": '<path d="M10 6V5a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v1"></path><rect x="3" y="6" width="18" height="14" rx="2"></rect><path d="M3 12h18"></path>',
    "calendar": '<rect x="3" y="4" width="18" height="17" rx="2"></rect><path d="M8 2v4M16 2v4M3 10h18"></path>',
    "car": '<path d="M5 14l1.5-4.5A3 3 0 0 1 9.3 7h5.4a3 3 0 0 1 2.8 2.5L19 14"></path><path d="M4 14h16v5a1 1 0 0 1-1 1h-1a2 2 0 0 1-4 0H10a2 2 0 0 1-4 0H5a1 1 0 0 1-1-1v-5Z"></path><path d="M7 14h.01M17 14h.01"></path>',
    "chart": '<path d="M4 19V5"></path><path d="M4 19h16"></path><rect x="7" y="11" width="3" height="5"></rect><rect x="12" y="8" width="3" height="8"></rect><rect x="17" y="4" width="3" height="12"></rect>',
    "check": '<path d="m5 12 4 4L19 6"></path>',
    "chevron-right": '<path d="m9 18 6-6-6-6"></path>',
    "download": '<path d="M12 3v12"></path><path d="m7 10 5 5 5-5"></path><path d="M5 21h14"></path>',
    "edit": '<path d="M12 20h9"></path><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"></path>',
    "filter": '<path d="M4 5h16"></path><path d="M7 12h10"></path><path d="M10 19h4"></path>',
    "gauge": '<path d="M21 13a9 9 0 1 0-18 0"></path><path d="M12 13l4-4"></path><path d="M8 17h8"></path>',
    "inbox": '<path d="M22 12h-6l-2 3h-4l-2-3H2"></path><path d="M5 5h14l3 7v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6Z"></path>',
    "log-in": '<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><path d="m10 17 5-5-5-5"></path><path d="M15 12H3"></path>',
    "log-out": '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><path d="m16 17 5-5-5-5"></path><path d="M21 12H9"></path>',
    "mail": '<rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="m3 7 9 6 9-6"></path>',
    "menu": '<path d="M4 6h16M4 12h16M4 18h16"></path>',
    "plus": '<path d="M12 5v14M5 12h14"></path>',
    "printer": '<path d="M6 9V3h12v6"></path><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><path d="M6 14h12v7H6z"></path>',
    "receipt": '<path d="M6 2h12v20l-3-2-3 2-3-2-3 2Z"></path><path d="M9 7h6M9 11h6M9 15h4"></path>',
    "refresh": '<path d="M21 12a9 9 0 1 1-2.64-6.36"></path><path d="M21 3v6h-6"></path>',
    "search": '<circle cx="11" cy="11" r="7"></circle><path d="m20 20-3.5-3.5"></path>',
    "settings": '<path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"></path><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21a2 2 0 1 1-4 0v-.09A1.7 1.7 0 0 0 8 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1.1-.4H3a2 2 0 1 1 0-4h.09A1.7 1.7 0 0 0 4.6 8a1.7 1.7 0 0 0-.34-1.88l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1.1V3a2 2 0 1 1 4 0v.09A1.7 1.7 0 0 0 16 4.6a1.7 1.7 0 0 0 1.88-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9c.18.37.5.69.9.9.34.17.72.25 1.1.25H21a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.51.85Z"></path>',
    "shield": '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"></path>',
    "trash": '<path d="M3 6h18"></path><path d="M8 6V4h8v2"></path><path d="M19 6l-1 15H6L5 6"></path><path d="M10 11v6M14 11v6"></path>',
    "truck": '<path d="M3 6h12v10H3z"></path><path d="M15 10h4l2 3v3h-6Z"></path><circle cx="7" cy="18" r="2"></circle><circle cx="17" cy="18" r="2"></circle>',
    "user": '<path d="M20 21a8 8 0 0 0-16 0"></path><circle cx="12" cy="7" r="4"></circle>',
    "users": '<path d="M17 21a5 5 0 0 0-10 0"></path><circle cx="12" cy="8" r="4"></circle><path d="M22 21a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path><path d="M2 21a4 4 0 0 1 3-3.87"></path><path d="M8 3.13a4 4 0 0 0 0 7.75"></path>',
    "wrench": '<path d="M14.7 6.3a4 4 0 0 0-5 5L3 18l3 3 6.7-6.7a4 4 0 0 0 5-5l-2.4 2.4-3-3Z"></path>',
    "x": '<path d="M18 6 6 18M6 6l12 12"></path>'
  };

  const pageCatalog = [
    { id: "dashboard", label: "Dashboard", icon: "gauge", group: "Overview", roles: ["super_admin", "manager", "staff", "driver", "investor"] },
    { id: "fleet", label: "Fleet", icon: "truck", group: "Operations", roles: ["super_admin", "manager", "staff"] },
    { id: "drivers", label: "Drivers", icon: "users", group: "Operations", roles: ["super_admin", "manager", "staff"] },
    { id: "investors", label: "Investors", icon: "briefcase", group: "Operations", roles: ["super_admin", "manager"] },
    { id: "remittances", label: "Remittances", icon: "banknote", group: "Finance", roles: ["super_admin", "manager", "staff"] },
    { id: "maintenance", label: "Maintenance", icon: "wrench", group: "Operations", roles: ["super_admin", "manager", "staff", "driver"] },
    { id: "invoices", label: "Invoices", icon: "receipt", group: "Finance", roles: ["super_admin", "manager", "staff", "investor"] },
    { id: "reports", label: "Reports", icon: "chart", group: "Finance", roles: ["super_admin", "manager", "staff", "investor"] },
    { id: "driver-portal", label: "Driver Portal", icon: "user", group: "Portal", roles: ["driver"] },
    { id: "investor-portal", label: "Investor Portal", icon: "briefcase", group: "Portal", roles: ["investor"] },
    { id: "users", label: "Users", icon: "shield", group: "Admin", roles: ["super_admin"] },
    { id: "settings", label: "Settings", icon: "settings", group: "Admin", roles: ["super_admin", "manager"] }
  ];

  const roleLabels = {
    super_admin: "Super Admin",
    manager: "Manager",
    staff: "Staff",
    driver: "Driver",
    investor: "Investor"
  };

  const state = {
    db: null,
    session: null,
    page: "dashboard",
    query: "",
    selectedInvoiceId: null,
    reportRange: "month",
    reportStart: "",
    reportEnd: "",
    sidebarOpen: false
  };

  function seedData() {
    return {
      settings: {
        companyName: "MetroTrust Transport",
        currency: "KES",
        phone: "+254 700 100 200",
        email: "operations@metrotrust.local",
        address: "Nairobi, Kenya",
        dailyTargetDefault: 3500
      },
      users: [
        { id: "u-admin", name: "Amina Otieno", email: "admin@metrotrust.local", password: "admin123", role: "super_admin", active: true },
        { id: "u-manager", name: "David Njoroge", email: "manager@metrotrust.local", password: "manager123", role: "manager", active: true },
        { id: "u-staff", name: "Lilian Wambui", email: "staff@metrotrust.local", password: "staff123", role: "staff", active: true },
        { id: "u-driver", name: "Peter Mwangi", email: "driver@metrotrust.local", password: "driver123", role: "driver", active: true, driverId: "d-001" },
        { id: "u-investor", name: "Grace Kariuki", email: "investor@metrotrust.local", password: "investor123", role: "investor", active: true, investorId: "i-001" }
      ],
      drivers: [
        { id: "d-001", name: "Peter Mwangi", phone: "0712 441 905", license: "DL-NTSA-20411", status: "Active", staffNo: "DRV-001", joinDate: "2025-09-12", assignedVehicleId: "v-001", targetDaily: 3800, userId: "u-driver" },
        { id: "d-002", name: "Mercy Achieng", phone: "0724 771 320", license: "DL-NTSA-19843", status: "Active", staffNo: "DRV-002", joinDate: "2025-10-05", assignedVehicleId: "v-002", targetDaily: 3600 },
        { id: "d-003", name: "Samuel Kibet", phone: "0798 551 234", license: "DL-NTSA-22419", status: "Maintenance", staffNo: "DRV-003", joinDate: "2025-11-18", assignedVehicleId: "v-003", targetDaily: 3400 },
        { id: "d-004", name: "Jane Muthoni", phone: "0701 665 919", license: "DL-NTSA-23442", status: "Active", staffNo: "DRV-004", joinDate: "2026-01-09", assignedVehicleId: "v-004", targetDaily: 4100 }
      ],
      investors: [
        { id: "i-001", name: "Grace Kariuki", phone: "0711 901 443", email: "investor@metrotrust.local", status: "Active", payoutMethod: "Bank", userId: "u-investor" },
        { id: "i-002", name: "Metro Holdings Ltd", phone: "020 440 660", email: "accounts@metroholdings.local", status: "Active", payoutMethod: "Bank" },
        { id: "i-003", name: "Joseph Mutua", phone: "0722 004 551", email: "jmutua@example.com", status: "Active", payoutMethod: "M-Pesa" }
      ],
      vehicles: [
        { id: "v-001", plate: "KDG 412A", make: "Toyota", model: "Hiace", year: 2021, category: "PSV Van", status: "Active", driverId: "d-001", investorId: "i-001", dailyTarget: 3800, mileage: 88420, nextServiceDate: addDays(-2), acquisitionCost: 2750000 },
        { id: "v-002", plate: "KCL 736M", make: "Nissan", model: "NV350", year: 2020, category: "PSV Van", status: "Active", driverId: "d-002", investorId: "i-002", dailyTarget: 3600, mileage: 102600, nextServiceDate: addDays(18), acquisitionCost: 2480000 },
        { id: "v-003", plate: "KDK 128Q", make: "Isuzu", model: "NQR", year: 2019, category: "Shuttle", status: "Maintenance", driverId: "d-003", investorId: "i-001", dailyTarget: 3400, mileage: 126340, nextServiceDate: addDays(4), acquisitionCost: 3100000 },
        { id: "v-004", plate: "KDM 820L", make: "Toyota", model: "Coaster", year: 2022, category: "Bus", status: "Active", driverId: "d-004", investorId: "i-003", dailyTarget: 4100, mileage: 64210, nextServiceDate: addDays(30), acquisitionCost: 5200000 },
        { id: "v-005", plate: "KBU 993T", make: "Mitsubishi", model: "Canter", year: 2018, category: "Service", status: "Inactive", driverId: "", investorId: "i-002", dailyTarget: 3000, mileage: 154200, nextServiceDate: addDays(9), acquisitionCost: 2200000 }
      ],
      remittances: [
        { id: "r-001", date: today(), driverId: "d-001", vehicleId: "v-001", period: "Daily", amount: 4200, method: "M-Pesa", reference: "QDT84K1", status: "Paid", note: "Morning and evening shifts" },
        { id: "r-002", date: today(), driverId: "d-002", vehicleId: "v-002", period: "Daily", amount: 3650, method: "Cash", reference: "CASH-118", status: "Paid", note: "Counter receipt verified" },
        { id: "r-003", date: addDays(-1), driverId: "d-004", vehicleId: "v-004", period: "Daily", amount: 4550, method: "Bank", reference: "BNK-9092", status: "Paid", note: "Banked by branch staff" },
        { id: "r-004", date: addDays(-2), driverId: "d-001", vehicleId: "v-001", period: "Daily", amount: 3900, method: "M-Pesa", reference: "QDR28K9", status: "Paid", note: "" },
        { id: "r-005", date: addDays(-4), driverId: "d-002", vehicleId: "v-002", period: "Weekly", amount: 21800, method: "Bank", reference: "BNK-8820", status: "Paid", note: "Weekly settlement" },
        { id: "r-006", date: addDays(-8), driverId: "d-004", vehicleId: "v-004", period: "Daily", amount: 4050, method: "M-Pesa", reference: "QDK11P2", status: "Paid", note: "" },
        { id: "r-007", date: addDays(-12), driverId: "d-003", vehicleId: "v-003", period: "Daily", amount: 3350, method: "Cash", reference: "CASH-092", status: "Pending", note: "Pending reconciliation" }
      ],
      maintenance: [
        { id: "m-001", vehicleId: "v-003", date: addDays(-1), type: "Brake inspection", provider: "MetroTrust Workshop", cost: 28500, odometer: 126340, status: "Scheduled", nextDue: addDays(4), notes: "Vehicle held for brake lining replacement" },
        { id: "m-002", vehicleId: "v-001", date: addDays(-16), type: "Oil service", provider: "Highway Auto Care", cost: 11200, odometer: 87300, status: "Completed", nextDue: addDays(-2), notes: "Next service overdue" },
        { id: "m-003", vehicleId: "v-004", date: addDays(-25), type: "Tyre replacement", provider: "City Tyres", cost: 64000, odometer: 63050, status: "Completed", nextDue: addDays(30), notes: "Two rear tyres replaced" },
        { id: "m-004", vehicleId: "v-002", date: addDays(-6), type: "Suspension check", provider: "Nairobi Auto Works", cost: 16800, odometer: 102600, status: "Completed", nextDue: addDays(18), notes: "Bushings checked" }
      ],
      invoices: [
        {
          id: "inv-001",
          number: "MTF-2026-001",
          type: "Maintenance",
          date: today(),
          dueDate: addDays(7),
          partyName: "Grace Kariuki",
          relatedId: "v-003",
          status: "Pending",
          notes: "Brake inspection and parts deposit",
          items: [{ description: "Brake service deposit", qty: 1, unitPrice: 28500 }]
        },
        {
          id: "inv-002",
          number: "MTF-2026-002",
          type: "Investor Earnings",
          date: addDays(-3),
          dueDate: addDays(4),
          partyName: "Metro Holdings Ltd",
          relatedId: "i-002",
          status: "Paid",
          notes: "Weekly investor settlement",
          items: [{ description: "Vehicle earnings less maintenance reserve", qty: 1, unitPrice: 18400 }]
        }
      ],
      audit: [
        { id: "a-001", at: new Date().toISOString(), user: "System", action: "Sample data seeded" }
      ]
    };
  }

  function $(selector, root) {
    return (root || document).querySelector(selector);
  }

  function $all(selector, root) {
    return Array.from((root || document).querySelectorAll(selector));
  }

  function icon(name) {
    const path = iconPaths[name] || iconPaths.activity;
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`;
  }

  function hydrateIcons(root) {
    $all("[data-icon]", root || document).forEach((node) => {
      node.innerHTML = icon(node.dataset.icon);
    });
  }

  function today() {
    return new Date().toISOString().slice(0, 10);
  }

  function addDays(days) {
    const d = new Date();
    d.setDate(d.getDate() + days);
    return d.toISOString().slice(0, 10);
  }

  function parseDate(value) {
    return new Date(`${value}T00:00:00`);
  }

  function startOfWeek(date) {
    const d = new Date(date);
    const day = d.getDay() || 7;
    d.setDate(d.getDate() - day + 1);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  function startOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }

  function endOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
  }

  function formatDate(value) {
    if (!value) return "Not set";
    return new Intl.DateTimeFormat("en-KE", { day: "2-digit", month: "short", year: "numeric" }).format(parseDate(value));
  }

  function money(value) {
    const currency = state.db?.settings?.currency || "KES";
    return new Intl.NumberFormat("en-KE", { style: "currency", currency, maximumFractionDigits: 0 }).format(Number(value || 0));
  }

  function readDb() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const seeded = seedData();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
      return seeded;
    }
    try {
      return JSON.parse(raw);
    } catch (error) {
      const seeded = seedData();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
      return seeded;
    }
  }

  function writeDb() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.db));
  }

  function audit(action) {
    const user = currentUser()?.name || "System";
    state.db.audit.unshift({ id: makeId("a"), at: new Date().toISOString(), user, action });
    state.db.audit = state.db.audit.slice(0, 80);
  }

  function makeId(prefix) {
    return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
  }

  function currentUser() {
    if (!state.session) return null;
    return state.db.users.find((user) => user.id === state.session.userId) || null;
  }

  function rolePages() {
    const user = currentUser();
    if (!user) return [];
    return pageCatalog.filter((page) => page.roles.includes(user.role));
  }

  function canWrite(entity) {
    const role = currentUser()?.role;
    if (role === "super_admin") return true;
    if (role === "manager") return !["users"].includes(entity);
    if (role === "staff") return ["drivers", "fleet", "remittances", "maintenance", "invoices"].includes(entity);
    return false;
  }

  function byId(list, id) {
    return list.find((item) => item.id === id) || null;
  }

  function driverName(id) {
    return byId(state.db.drivers, id)?.name || "Unassigned";
  }

  function investorName(id) {
    return byId(state.db.investors, id)?.name || "Unassigned";
  }

  function vehicleLabel(id) {
    const vehicle = byId(state.db.vehicles, id);
    return vehicle ? `${vehicle.plate} ${vehicle.make} ${vehicle.model}` : "Unassigned";
  }

  function vehiclePlate(id) {
    return byId(state.db.vehicles, id)?.plate || "Unassigned";
  }

  function getScopedVehicles() {
    const user = currentUser();
    if (!user) return [];
    if (user.role === "driver") return state.db.vehicles.filter((vehicle) => vehicle.driverId === user.driverId);
    if (user.role === "investor") return state.db.vehicles.filter((vehicle) => vehicle.investorId === user.investorId);
    return state.db.vehicles;
  }

  function getScopedRemittances() {
    const user = currentUser();
    if (!user) return [];
    if (user.role === "driver") return state.db.remittances.filter((item) => item.driverId === user.driverId);
    if (user.role === "investor") {
      const vehicleIds = new Set(getScopedVehicles().map((vehicle) => vehicle.id));
      return state.db.remittances.filter((item) => vehicleIds.has(item.vehicleId));
    }
    return state.db.remittances;
  }

  function getScopedMaintenance() {
    const user = currentUser();
    if (!user) return [];
    const vehicleIds = new Set(getScopedVehicles().map((vehicle) => vehicle.id));
    if (["driver", "investor"].includes(user.role)) {
      return state.db.maintenance.filter((item) => vehicleIds.has(item.vehicleId));
    }
    return state.db.maintenance;
  }

  function inRange(dateValue, start, end) {
    const d = parseDate(dateValue);
    return d >= start && d <= end;
  }

  function totalRemittance(start, end, list) {
    return (list || getScopedRemittances())
      .filter((item) => inRange(item.date, start, end) && item.status !== "Cancelled")
      .reduce((sum, item) => sum + Number(item.amount || 0), 0);
  }

  function totalMaintenance(start, end, list) {
    return (list || getScopedMaintenance())
      .filter((item) => inRange(item.date, start, end) && item.status !== "Cancelled")
      .reduce((sum, item) => sum + Number(item.cost || 0), 0);
  }

  function toast(message) {
    const node = $("#toast");
    node.textContent = message;
    node.classList.add("show");
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => node.classList.remove("show"), 2600);
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function status(value) {
    return `<span class="status" data-status="${escapeHtml(value)}">${escapeHtml(value || "Not set")}</span>`;
  }

  function initials(name) {
    return String(name || "MT")
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0].toUpperCase())
      .join("");
  }

  function init() {
    state.db = readDb();
    state.session = JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
    hydrateIcons();
    bindStaticEvents();
    if (state.session && currentUser()) {
      showApp();
    } else {
      showLogin();
    }
  }

  function bindStaticEvents() {
    $("#loginForm").addEventListener("submit", handleLogin);
    $("#logoutBtn").addEventListener("click", logout);
    $("#magicLinkBtn").addEventListener("click", () => toast("Magic link mode is ready for Supabase authentication."));
    $("#printPageBtn").addEventListener("click", () => window.print());
    $("#menuToggle").addEventListener("click", toggleSidebar);
    $("#modalRoot").addEventListener("click", (event) => {
      if (event.target.matches("[data-close-modal]")) closeModal();
      if (event.target.closest("[data-print-invoice]")) window.print();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeModal();
    });
  }

  function handleLogin(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") || "").trim().toLowerCase();
    const password = String(data.get("password") || "");
    const user = state.db.users.find((item) => item.email.toLowerCase() === email && item.password === password && item.active);
    if (!user) {
      toast("Login failed. Check the email address and password.");
      return;
    }
    state.session = { userId: user.id, at: new Date().toISOString() };
    localStorage.setItem(SESSION_KEY, JSON.stringify(state.session));
    state.page = rolePages()[0]?.id || "dashboard";
    audit(`Signed in as ${roleLabels[user.role]}`);
    writeDb();
    showApp();
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY);
    state.session = null;
    showLogin();
  }

  function showLogin() {
    $("#loginScreen").hidden = false;
    $("#appShell").hidden = true;
  }

  function showApp() {
    $("#loginScreen").hidden = true;
    $("#appShell").hidden = false;
    renderShell();
    renderPage();
  }

  function renderShell() {
    const user = currentUser();
    $("#companyLine").textContent = state.db.settings.companyName;
    $("#userChip").innerHTML = `
      <span class="avatar">${initials(user.name)}</span>
      <span class="chip-copy">
        <strong>${escapeHtml(user.name)}</strong>
        <span>${roleLabels[user.role] || user.role}</span>
      </span>
    `;

    const grouped = groupBy(rolePages(), "group");
    $("#sideNav").innerHTML = Object.entries(grouped).map(([group, pages]) => `
      <div class="nav-group-title">${escapeHtml(group)}</div>
      ${pages.map(navButton).join("")}
    `).join("");

    $("#mobileNav").innerHTML = rolePages().slice(0, 5).map(navButton).join("");
    hydrateIcons($("#sideNav"));
    hydrateIcons($("#mobileNav"));
    bindNav($("#sideNav"));
    bindNav($("#mobileNav"));
  }

  function navButton(page) {
    return `
      <button class="nav-link ${state.page === page.id ? "active" : ""}" type="button" data-page="${page.id}">
        <span data-icon="${page.icon}"></span>
        <span>${escapeHtml(page.label)}</span>
      </button>
    `;
  }

  function bindNav(root) {
    $all("[data-page]", root).forEach((button) => {
      button.addEventListener("click", () => {
        setPage(button.dataset.page);
      });
    });
  }

  function setPage(page) {
    if (!rolePages().some((item) => item.id === page)) return;
    state.page = page;
    state.query = "";
    state.sidebarOpen = false;
    $("#sidebar").classList.remove("open");
    renderShell();
    renderPage();
  }

  function toggleSidebar() {
    state.sidebarOpen = !state.sidebarOpen;
    $("#sidebar").classList.toggle("open", state.sidebarOpen);
  }

  function setHeading(title, subtitle, eyebrow) {
    $("#pageTitle").textContent = title;
    $("#pageSubtitle").textContent = subtitle;
    $("#pageEyebrow").textContent = eyebrow || "Workspace";
  }

  function setActions(html) {
    $("#pageActions").innerHTML = html || "";
    hydrateIcons($("#pageActions"));
  }

  function renderPage() {
    const renderers = {
      dashboard: renderDashboard,
      fleet: renderFleet,
      drivers: renderDrivers,
      investors: renderInvestors,
      remittances: renderRemittances,
      maintenance: renderMaintenance,
      invoices: renderInvoices,
      reports: renderReports,
      "driver-portal": renderDriverPortal,
      "investor-portal": renderInvestorPortal,
      users: renderUsers,
      settings: renderSettings
    };
    (renderers[state.page] || renderDashboard)();
    hydrateIcons($("#pageContent"));
    bindPageEvents();
  }

  function renderDashboard() {
    const now = new Date();
    const todayStart = parseDate(today());
    const weekStart = startOfWeek(now);
    const monthStart = startOfMonth(now);
    const monthEnd = endOfMonth(now);
    const remittances = getScopedRemittances();
    const vehicles = getScopedVehicles();
    const maintenance = getScopedMaintenance();
    const alerts = maintenanceDue(vehicles, maintenance);

    setHeading("Dashboard", "Live operating position for vehicles, drivers, earnings, and maintenance.", "Overview");
    setActions(`
      <button class="ghost-action" type="button" data-open-report>${icon("chart")} View report</button>
      ${canWrite("remittances") ? `<button class="primary-action" type="button" data-modal="remittance">${icon("plus")} Record remittance</button>` : ""}
    `);

    $("#pageContent").innerHTML = `
      <div class="hero-panel">
        <div class="hero-image">
          <img src="assets/images/maintenance-bay.jpg" alt="Vehicle maintenance bay">
        </div>
        <div class="hero-copy">
          <p class="eyebrow">Operations queue</p>
          <h3>${roleIntro()}</h3>
          <p>Track daily cash flow, service exposure, driver assignments, investor balances, and printable reports from one local-first workspace.</p>
          <div class="record-list">
            ${alerts.slice(0, 3).map((item) => `
              <div class="record-line">
                <div>
                  <strong>${escapeHtml(item.plate)} service attention</strong>
                  <span>${escapeHtml(item.message)}</span>
                </div>
                ${status(item.level)}
              </div>
            `).join("") || emptyCompact("No maintenance alerts in scope.")}
          </div>
        </div>
      </div>
      <div class="metrics-grid">
        ${metric("Fleet size", vehicles.length, "Vehicles in scope", "truck")}
        ${metric("Active drivers", state.db.drivers.filter((driver) => driver.status === "Active").length, "Ready for allocation", "users")}
        ${metric("Today revenue", money(totalRemittance(todayStart, todayStart, remittances)), "Recorded remittances", "banknote")}
        ${metric("Month net", money(totalRemittance(monthStart, monthEnd, remittances) - totalMaintenance(monthStart, monthEnd, maintenance)), "Revenue less maintenance", "activity")}
      </div>
      <div class="grid-two">
        <section class="data-panel">
          <div class="panel-header">
            <div>
              <h3>Weekly Remittances</h3>
              <p>Last seven operating days.</p>
            </div>
          </div>
          ${renderWeeklyChart(remittances)}
        </section>
        <section class="data-panel">
          <div class="panel-header">
            <div>
              <h3>Recent Collections</h3>
              <p>Latest driver payments.</p>
            </div>
          </div>
          ${recentRemittanceList(remittances)}
        </section>
      </div>
      <section class="data-panel">
        <div class="panel-header">
          <div>
            <h3>Maintenance Alerts</h3>
            <p>Vehicles due, overdue, or under active service.</p>
          </div>
        </div>
        ${alertsTable(alerts)}
      </section>
    `;
  }

  function roleIntro() {
    const user = currentUser();
    if (user.role === "driver") return "Your assigned vehicle, remittance history, and service notices are ready.";
    if (user.role === "investor") return "Your vehicle earnings and maintenance deductions are summarized here.";
    return "A clear command center for MetroTrust fleet performance.";
  }

  function metric(label, value, note, iconName) {
    return `
      <article class="metric-card">
        <span class="metric-icon">${icon(iconName)}</span>
        <span class="metric-value">${escapeHtml(value)}</span>
        <span class="metric-label">${escapeHtml(label)}</span>
        <span class="metric-note">${escapeHtml(note)}</span>
      </article>
    `;
  }

  function renderWeeklyChart(remittances) {
    const days = Array.from({ length: 7 }, (_, index) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - index));
      const key = date.toISOString().slice(0, 10);
      return {
        key,
        label: new Intl.DateTimeFormat("en-KE", { weekday: "short" }).format(date),
        value: remittances.filter((item) => item.date === key).reduce((sum, item) => sum + Number(item.amount || 0), 0)
      };
    });
    const max = Math.max(...days.map((day) => day.value), 1);
    return `
      <div class="chart">
        ${days.map((day) => `
          <div class="bar">
            <div class="bar-fill" style="height:${Math.max(6, Math.round((day.value / max) * 150))}px"></div>
            <strong>${escapeHtml(day.label)}</strong>
            <span>${money(day.value).replace(".00", "")}</span>
          </div>
        `).join("")}
      </div>
    `;
  }

  function recentRemittanceList(remittances) {
    const rows = [...remittances].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 6);
    if (!rows.length) return emptyState();
    return `<div class="record-list">${rows.map((item) => `
      <div class="record-line">
        <div>
          <strong>${escapeHtml(driverName(item.driverId))}</strong>
          <span>${formatDate(item.date)} on ${escapeHtml(vehiclePlate(item.vehicleId))}</span>
        </div>
        <strong>${money(item.amount)}</strong>
      </div>
    `).join("")}</div>`;
  }

  function maintenanceDue(vehicles, maintenance) {
    const now = parseDate(today());
    const inFourteen = new Date(now);
    inFourteen.setDate(now.getDate() + 14);
    const activeMaintenanceVehicles = new Set(maintenance.filter((item) => item.status === "Scheduled" || item.status === "Pending").map((item) => item.vehicleId));
    return vehicles
      .map((vehicle) => {
        const next = vehicle.nextServiceDate ? parseDate(vehicle.nextServiceDate) : null;
        if (activeMaintenanceVehicles.has(vehicle.id)) {
          return { plate: vehicle.plate, vehicleId: vehicle.id, level: "Scheduled", date: vehicle.nextServiceDate, message: "Maintenance job is open." };
        }
        if (next && next < now) {
          return { plate: vehicle.plate, vehicleId: vehicle.id, level: "Overdue", date: vehicle.nextServiceDate, message: `Service was due ${formatDate(vehicle.nextServiceDate)}.` };
        }
        if (next && next <= inFourteen) {
          return { plate: vehicle.plate, vehicleId: vehicle.id, level: "Pending", date: vehicle.nextServiceDate, message: `Service due ${formatDate(vehicle.nextServiceDate)}.` };
        }
        return null;
      })
      .filter(Boolean)
      .sort((a, b) => String(a.date).localeCompare(String(b.date)));
  }

  function alertsTable(alerts) {
    if (!alerts.length) return emptyState();
    return table(["Vehicle", "Alert", "Due date", "Status"], alerts.map((item) => [
      escapeHtml(item.plate),
      escapeHtml(item.message),
      formatDate(item.date),
      status(item.level)
    ]));
  }

  function renderFleet() {
    setHeading("Fleet", "Register vehicles, assign drivers and owners, and track operating status.", "Operations");
    setActions(canWrite("fleet") ? `<button class="primary-action" type="button" data-modal="vehicle">${icon("plus")} Add vehicle</button>` : "");
    const vehicles = applySearch(state.db.vehicles, ["plate", "make", "model", "category", "status"]);
    $("#pageContent").innerHTML = `
      ${toolbar("Search fleet by plate, make, model, or status")}
      <section class="data-panel">
        ${vehicleTable(vehicles)}
      </section>
    `;
  }

  function vehicleTable(vehicles) {
    if (!vehicles.length) return emptyState();
    return table(["Plate", "Vehicle", "Driver", "Investor", "Target", "Next service", "Status", ""], vehicles.map((vehicle) => [
      `<strong>${escapeHtml(vehicle.plate)}</strong>`,
      `${escapeHtml(vehicle.year)} ${escapeHtml(vehicle.make)} ${escapeHtml(vehicle.model)}<br><span class="muted">${escapeHtml(vehicle.category)} - ${Number(vehicle.mileage || 0).toLocaleString()} km</span>`,
      escapeHtml(driverName(vehicle.driverId)),
      escapeHtml(investorName(vehicle.investorId)),
      money(vehicle.dailyTarget),
      formatDate(vehicle.nextServiceDate),
      status(vehicle.status),
      rowActions("vehicle", vehicle.id, canWrite("fleet"))
    ]));
  }

  function renderDrivers() {
    setHeading("Drivers", "Manage driver records, targets, licenses, and vehicle assignments.", "Operations");
    setActions(canWrite("drivers") ? `<button class="primary-action" type="button" data-modal="driver">${icon("plus")} Add driver</button>` : "");
    const drivers = applySearch(state.db.drivers, ["name", "phone", "license", "staffNo", "status"]);
    $("#pageContent").innerHTML = `
      ${toolbar("Search drivers by name, phone, license, or status")}
      <section class="data-panel">
        ${driverTable(drivers)}
      </section>
    `;
  }

  function driverTable(drivers) {
    if (!drivers.length) return emptyState();
    return table(["Driver", "Phone", "License", "Vehicle", "Daily target", "Joined", "Status", ""], drivers.map((driver) => [
      `<strong>${escapeHtml(driver.name)}</strong><br><span class="muted">${escapeHtml(driver.staffNo)}</span>`,
      escapeHtml(driver.phone),
      escapeHtml(driver.license),
      escapeHtml(vehiclePlate(driver.assignedVehicleId)),
      money(driver.targetDaily),
      formatDate(driver.joinDate),
      status(driver.status),
      rowActions("driver", driver.id, canWrite("drivers"))
    ]));
  }

  function renderInvestors() {
    setHeading("Investors", "Track vehicle ownership, earnings, and payout routes.", "Finance");
    setActions(canWrite("investors") ? `<button class="primary-action" type="button" data-modal="investor">${icon("plus")} Add investor</button>` : "");
    const investors = applySearch(state.db.investors, ["name", "phone", "email", "status", "payoutMethod"]);
    $("#pageContent").innerHTML = `
      ${toolbar("Search investors by name, phone, email, or payout method")}
      <section class="data-panel">
        ${investorTable(investors)}
      </section>
    `;
  }

  function investorTable(investors) {
    if (!investors.length) return emptyState();
    const monthStart = startOfMonth(new Date());
    const monthEnd = endOfMonth(new Date());
    return table(["Investor", "Contact", "Vehicles", "Month earnings", "Payout", "Status", ""], investors.map((investor) => {
      const vehicles = state.db.vehicles.filter((vehicle) => vehicle.investorId === investor.id);
      const vehicleIds = new Set(vehicles.map((vehicle) => vehicle.id));
      const earnings = totalRemittance(monthStart, monthEnd, state.db.remittances.filter((item) => vehicleIds.has(item.vehicleId)));
      return [
        `<strong>${escapeHtml(investor.name)}</strong><br><span class="muted">${escapeHtml(investor.email)}</span>`,
        escapeHtml(investor.phone),
        vehicles.map((vehicle) => vehicle.plate).join(", ") || "None",
        money(earnings),
        escapeHtml(investor.payoutMethod),
        status(investor.status),
        rowActions("investor", investor.id, canWrite("investors"))
      ];
    }));
  }

  function renderRemittances() {
    setHeading("Remittances", "Record driver earnings and reconcile daily, weekly, and monthly collections.", "Finance");
    setActions(canWrite("remittances") ? `<button class="primary-action" type="button" data-modal="remittance">${icon("plus")} Record remittance</button>` : "");
    const remittances = applySearch(state.db.remittances, ["period", "method", "reference", "status", "note"], (item) => `${driverName(item.driverId)} ${vehiclePlate(item.vehicleId)}`);
    const todayStart = parseDate(today());
    const weekStart = startOfWeek(new Date());
    const monthStart = startOfMonth(new Date());
    const monthEnd = endOfMonth(new Date());
    $("#pageContent").innerHTML = `
      <div class="metrics-grid">
        ${metric("Today", money(totalRemittance(todayStart, todayStart, state.db.remittances)), "Daily collection", "banknote")}
        ${metric("This week", money(totalRemittance(weekStart, new Date(), state.db.remittances)), "Week to date", "calendar")}
        ${metric("This month", money(totalRemittance(monthStart, monthEnd, state.db.remittances)), "Month total", "chart")}
        ${metric("Pending", state.db.remittances.filter((item) => item.status === "Pending").length, "Needs reconciliation", "filter")}
      </div>
      ${toolbar("Search remittances by driver, vehicle, reference, or method")}
      <section class="data-panel">
        ${remittanceTable(remittances)}
      </section>
    `;
  }

  function remittanceTable(remittances) {
    if (!remittances.length) return emptyState();
    const rows = [...remittances].sort((a, b) => b.date.localeCompare(a.date));
    return table(["Date", "Driver", "Vehicle", "Period", "Amount", "Method", "Reference", "Status", ""], rows.map((item) => [
      formatDate(item.date),
      escapeHtml(driverName(item.driverId)),
      escapeHtml(vehiclePlate(item.vehicleId)),
      escapeHtml(item.period),
      `<strong>${money(item.amount)}</strong>`,
      escapeHtml(item.method),
      escapeHtml(item.reference),
      status(item.status),
      rowActions("remittance", item.id, canWrite("remittances"))
    ]));
  }

  function renderMaintenance() {
    const scoped = currentUser()?.role === "driver" ? getScopedMaintenance() : state.db.maintenance;
    setHeading("Maintenance", "Log services, costs, providers, odometer readings, and service alerts.", "Operations");
    setActions(canWrite("maintenance") ? `<button class="primary-action" type="button" data-modal="maintenance">${icon("plus")} Log maintenance</button>` : "");
    const maintenance = applySearch(scoped, ["type", "provider", "status", "notes"], (item) => vehiclePlate(item.vehicleId));
    const monthStart = startOfMonth(new Date());
    const monthEnd = endOfMonth(new Date());
    $("#pageContent").innerHTML = `
      <div class="metrics-grid">
        ${metric("Open jobs", scoped.filter((item) => item.status === "Scheduled" || item.status === "Pending").length, "Maintenance queue", "wrench")}
        ${metric("Month cost", money(totalMaintenance(monthStart, monthEnd, scoped)), "Logged expense", "banknote")}
        ${metric("Due soon", maintenanceDue(getScopedVehicles(), scoped).length, "Vehicle alerts", "calendar")}
        ${metric("Completed", scoped.filter((item) => item.status === "Completed").length, "Service history", "check")}
      </div>
      ${toolbar("Search maintenance by vehicle, provider, status, or notes")}
      <section class="data-panel">
        ${maintenanceTable(maintenance)}
      </section>
    `;
  }

  function maintenanceTable(maintenance) {
    if (!maintenance.length) return emptyState();
    const rows = [...maintenance].sort((a, b) => b.date.localeCompare(a.date));
    return table(["Date", "Vehicle", "Service", "Provider", "Cost", "Odometer", "Next due", "Status", ""], rows.map((item) => [
      formatDate(item.date),
      escapeHtml(vehiclePlate(item.vehicleId)),
      escapeHtml(item.type),
      escapeHtml(item.provider),
      money(item.cost),
      `${Number(item.odometer || 0).toLocaleString()} km`,
      formatDate(item.nextDue),
      status(item.status),
      rowActions("maintenance", item.id, canWrite("maintenance"))
    ]));
  }

  function renderInvoices() {
    setHeading("Invoices", "Create invoices for remittances, maintenance, and investor earnings with printable previews.", "Finance");
    setActions(canWrite("invoices") ? `<button class="primary-action" type="button" data-modal="invoice">${icon("plus")} Create invoice</button>` : "");
    const invoices = applySearch(state.db.invoices, ["number", "type", "partyName", "status", "notes"]);
    const selected = state.db.invoices.find((item) => item.id === state.selectedInvoiceId) || invoices[0] || state.db.invoices[0];
    if (selected) state.selectedInvoiceId = selected.id;
    $("#pageContent").innerHTML = `
      ${toolbar("Search invoices by number, type, party, or status")}
      <div class="grid-two">
        <section class="data-panel">
          ${invoiceTable(invoices)}
        </section>
        <section class="invoice-preview" id="invoicePreview">
          ${selected ? invoicePreview(selected) : emptyState()}
        </section>
      </div>
    `;
  }

  function invoiceTable(invoices) {
    if (!invoices.length) return emptyState();
    return table(["Invoice", "Party", "Type", "Date", "Total", "Status", ""], invoices.map((invoice) => [
      `<button class="table-action" type="button" data-select-invoice="${invoice.id}">${escapeHtml(invoice.number)}</button>`,
      escapeHtml(invoice.partyName),
      escapeHtml(invoice.type),
      formatDate(invoice.date),
      `<strong>${money(invoiceTotal(invoice))}</strong>`,
      status(invoice.status),
      rowActions("invoice", invoice.id, canWrite("invoices"), true)
    ]));
  }

  function invoicePreview(invoice) {
    return `
      <div class="invoice-top">
        <div>
          <p class="eyebrow">${escapeHtml(state.db.settings.companyName)}</p>
          <h3>Invoice</h3>
        </div>
        <div class="invoice-meta">
          <strong>${escapeHtml(invoice.number)}</strong>
          <span>Issued ${formatDate(invoice.date)}</span>
          <span>Due ${formatDate(invoice.dueDate)}</span>
          ${status(invoice.status)}
        </div>
      </div>
      <div class="invoice-party">
        <div>
          <p class="eyebrow">From</p>
          <strong>${escapeHtml(state.db.settings.companyName)}</strong>
          <p class="muted">${escapeHtml(state.db.settings.address)}<br>${escapeHtml(state.db.settings.email)}<br>${escapeHtml(state.db.settings.phone)}</p>
        </div>
        <div>
          <p class="eyebrow">Bill to</p>
          <strong>${escapeHtml(invoice.partyName)}</strong>
          <p class="muted">${escapeHtml(invoice.type)}<br>${escapeHtml(invoice.notes || "No additional notes")}</p>
        </div>
      </div>
      ${table(["Description", "Qty", "Unit", "Total"], invoice.items.map((item) => [
        escapeHtml(item.description),
        Number(item.qty || 0).toLocaleString(),
        money(item.unitPrice),
        money(Number(item.qty || 0) * Number(item.unitPrice || 0))
      ]))}
      <div class="totals-row">
        <span>Total due</span>
        <span>${money(invoiceTotal(invoice))}</span>
      </div>
      <div class="form-actions no-print">
        <button class="ghost-action" type="button" data-print-invoice="${invoice.id}">${icon("printer")} Print or save PDF</button>
      </div>
    `;
  }

  function invoiceTotal(invoice) {
    return (invoice.items || []).reduce((sum, item) => sum + Number(item.qty || 0) * Number(item.unitPrice || 0), 0);
  }

  function renderReports() {
    setHeading("Reports", "Generate printable operational summaries for selected periods.", "Finance");
    setActions(`
      <button class="ghost-action" type="button" data-export-csv>${icon("download")} Export CSV</button>
      <button class="primary-action" type="button" data-print-report>${icon("printer")} Print or save PDF</button>
    `);
    const range = reportDates();
    const remittances = getScopedRemittances().filter((item) => inRange(item.date, range.start, range.end));
    const maintenance = getScopedMaintenance().filter((item) => inRange(item.date, range.start, range.end));
    const vehicles = getScopedVehicles();
    const revenue = totalRemittance(range.start, range.end, remittances);
    const cost = totalMaintenance(range.start, range.end, maintenance);
    $("#pageContent").innerHTML = `
      <section class="data-panel no-print">
        <div class="form-grid">
          <div>
            <label for="reportRange">Range</label>
            <select id="reportRange">
              <option value="today" ${state.reportRange === "today" ? "selected" : ""}>Today</option>
              <option value="week" ${state.reportRange === "week" ? "selected" : ""}>This week</option>
              <option value="month" ${state.reportRange === "month" ? "selected" : ""}>This month</option>
              <option value="custom" ${state.reportRange === "custom" ? "selected" : ""}>Custom</option>
            </select>
          </div>
          <div>
            <label for="reportStart">Start date</label>
            <input id="reportStart" type="date" value="${state.reportStart || range.start.toISOString().slice(0, 10)}">
          </div>
          <div>
            <label for="reportEnd">End date</label>
            <input id="reportEnd" type="date" value="${state.reportEnd || range.end.toISOString().slice(0, 10)}">
          </div>
          <div>
            <label>&nbsp;</label>
            <button class="ghost-action" type="button" data-apply-report>${icon("filter")} Apply filters</button>
          </div>
        </div>
      </section>
      <section class="report-sheet" id="reportSheet">
        <div class="invoice-top">
          <div>
            <p class="eyebrow">${escapeHtml(state.db.settings.companyName)}</p>
            <h3>Fleet Report</h3>
          </div>
          <div class="invoice-meta">
            <strong>${formatDate(range.start.toISOString().slice(0, 10))} to ${formatDate(range.end.toISOString().slice(0, 10))}</strong>
            <span>Generated ${new Date().toLocaleString("en-KE")}</span>
          </div>
        </div>
        <div class="metrics-grid">
          ${metric("Revenue", money(revenue), "Remittances", "banknote")}
          ${metric("Maintenance", money(cost), "Service cost", "wrench")}
          ${metric("Net earnings", money(revenue - cost), "Revenue less cost", "activity")}
          ${metric("Fleet in scope", vehicles.length, "Vehicles", "truck")}
        </div>
        <div class="grid-two">
          <div>
            <h3>Remittance Breakdown</h3>
            ${remittanceTable(remittances)}
          </div>
          <div>
            <h3>Maintenance Breakdown</h3>
            ${maintenanceTable(maintenance)}
          </div>
        </div>
      </section>
    `;
  }

  function reportDates() {
    const now = new Date();
    if (state.reportRange === "today") {
      return { start: parseDate(today()), end: parseDate(today()) };
    }
    if (state.reportRange === "week") {
      return { start: startOfWeek(now), end: now };
    }
    if (state.reportRange === "custom" && state.reportStart && state.reportEnd) {
      return { start: parseDate(state.reportStart), end: parseDate(state.reportEnd) };
    }
    return { start: startOfMonth(now), end: endOfMonth(now) };
  }

  function renderDriverPortal() {
    const user = currentUser();
    const driver = byId(state.db.drivers, user.driverId);
    const vehicle = driver ? byId(state.db.vehicles, driver.assignedVehicleId) : null;
    const remittances = getScopedRemittances();
    const monthStart = startOfMonth(new Date());
    const monthEnd = endOfMonth(new Date());
    setHeading("Driver Portal", "View assigned vehicle, payment history, and performance against target.", "Portal");
    setActions("");
    $("#pageContent").innerHTML = `
      <div class="portal-summary">
        <article class="photo-card">
          <img src="assets/images/driver-cabin.jpg" alt="Driver cabin view">
          <div>
            <h3>${escapeHtml(driver?.name || user.name)}</h3>
            <p>${escapeHtml(vehicle ? vehicleLabel(vehicle.id) : "No vehicle assigned")}</p>
          </div>
        </article>
        <div class="data-panel">
          <div class="metrics-grid">
            ${metric("Month paid", money(totalRemittance(monthStart, monthEnd, remittances)), "Your collections", "banknote")}
            ${metric("Daily target", money(driver?.targetDaily || 0), "Assigned target", "gauge")}
            ${metric("Vehicle status", vehicle?.status || "None", "Assignment", "truck")}
            ${metric("Next service", vehicle ? formatDate(vehicle.nextServiceDate) : "None", "Service schedule", "calendar")}
          </div>
        </div>
      </div>
      <section class="data-panel">
        <div class="panel-header"><h3>My Remittances</h3></div>
        ${remittanceTable(remittances)}
      </section>
    `;
  }

  function renderInvestorPortal() {
    const user = currentUser();
    const investor = byId(state.db.investors, user.investorId);
    const vehicles = getScopedVehicles();
    const vehicleIds = new Set(vehicles.map((vehicle) => vehicle.id));
    const remittances = state.db.remittances.filter((item) => vehicleIds.has(item.vehicleId));
    const maintenance = state.db.maintenance.filter((item) => vehicleIds.has(item.vehicleId));
    const monthStart = startOfMonth(new Date());
    const monthEnd = endOfMonth(new Date());
    const revenue = totalRemittance(monthStart, monthEnd, remittances);
    const cost = totalMaintenance(monthStart, monthEnd, maintenance);
    setHeading("Investor Portal", "Vehicle earnings, performance, maintenance costs, and statements.", "Portal");
    setActions("");
    $("#pageContent").innerHTML = `
      <div class="metrics-grid">
        ${metric("Vehicles", vehicles.length, investor?.name || "Investor", "truck")}
        ${metric("Month revenue", money(revenue), "Owned vehicles", "banknote")}
        ${metric("Month service", money(cost), "Maintenance cost", "wrench")}
        ${metric("Net earnings", money(revenue - cost), "Before payout fees", "activity")}
      </div>
      <section class="data-panel">
        <div class="panel-header"><h3>Vehicle Earnings</h3></div>
        ${investorVehicleTable(vehicles, remittances, maintenance)}
      </section>
      <section class="data-panel">
        <div class="panel-header"><h3>Investor Invoices</h3></div>
        ${invoiceTable(state.db.invoices.filter((invoice) => invoice.partyName === investor?.name || invoice.relatedId === investor?.id))}
      </section>
    `;
  }

  function investorVehicleTable(vehicles, remittances, maintenance) {
    if (!vehicles.length) return emptyState();
    const monthStart = startOfMonth(new Date());
    const monthEnd = endOfMonth(new Date());
    return table(["Vehicle", "Driver", "Revenue", "Maintenance", "Net", "Status"], vehicles.map((vehicle) => {
      const vehicleRemittances = remittances.filter((item) => item.vehicleId === vehicle.id);
      const vehicleMaintenance = maintenance.filter((item) => item.vehicleId === vehicle.id);
      const revenue = totalRemittance(monthStart, monthEnd, vehicleRemittances);
      const cost = totalMaintenance(monthStart, monthEnd, vehicleMaintenance);
      return [
        `<strong>${escapeHtml(vehicle.plate)}</strong><br><span class="muted">${escapeHtml(vehicle.make)} ${escapeHtml(vehicle.model)}</span>`,
        escapeHtml(driverName(vehicle.driverId)),
        money(revenue),
        money(cost),
        `<strong>${money(revenue - cost)}</strong>`,
        status(vehicle.status)
      ];
    }));
  }

  function renderUsers() {
    setHeading("Users", "Manage application access and role assignments.", "Admin");
    setActions(`<button class="primary-action" type="button" data-modal="user">${icon("plus")} Add user</button>`);
    const users = applySearch(state.db.users, ["name", "email", "role"]);
    $("#pageContent").innerHTML = `
      ${toolbar("Search users by name, email, or role")}
      <section class="data-panel">
        ${userTable(users)}
      </section>
    `;
  }

  function userTable(users) {
    if (!users.length) return emptyState();
    return table(["Name", "Email", "Role", "Linked record", "Status", ""], users.map((user) => [
      `<strong>${escapeHtml(user.name)}</strong>`,
      escapeHtml(user.email),
      escapeHtml(roleLabels[user.role] || user.role),
      user.driverId ? `Driver: ${escapeHtml(driverName(user.driverId))}` : user.investorId ? `Investor: ${escapeHtml(investorName(user.investorId))}` : "Staff account",
      status(user.active ? "Active" : "Inactive"),
      rowActions("user", user.id, true)
    ]));
  }

  function renderSettings() {
    setHeading("Settings", "Company profile, local backups, sample reset, and Supabase readiness.", "Admin");
    setActions("");
    $("#pageContent").innerHTML = `
      <div class="grid-two">
        <section class="data-panel">
          <div class="panel-header">
            <div>
              <h3>Company Profile</h3>
              <p>Used on invoices and reports.</p>
            </div>
          </div>
          <form id="settingsForm" class="form-grid">
            <div>
              <label for="companyName">Company name</label>
              <input id="companyName" name="companyName" value="${escapeHtml(state.db.settings.companyName)}" required>
            </div>
            <div>
              <label for="currency">Currency</label>
              <input id="currency" name="currency" value="${escapeHtml(state.db.settings.currency)}" required>
            </div>
            <div>
              <label for="phone">Phone</label>
              <input id="phone" name="phone" value="${escapeHtml(state.db.settings.phone)}">
            </div>
            <div>
              <label for="email">Email</label>
              <input id="email" name="email" value="${escapeHtml(state.db.settings.email)}">
            </div>
            <div class="full">
              <label for="address">Address</label>
              <textarea id="address" name="address">${escapeHtml(state.db.settings.address)}</textarea>
            </div>
            <div class="form-actions full">
              <button class="primary-action" type="submit">${icon("check")} Save settings</button>
            </div>
          </form>
        </section>
        <section class="data-panel">
          <div class="panel-header">
            <div>
              <h3>Data Management</h3>
              <p>LocalStorage is the default database for this build.</p>
            </div>
          </div>
          <div class="record-list">
            <div class="record-line">
              <div>
                <strong>Backup data</strong>
                <span>Download the current local database as JSON.</span>
              </div>
              <button class="ghost-action" type="button" data-backup>${icon("download")} Backup</button>
            </div>
            <div class="record-line">
              <div>
                <strong>Restore data</strong>
                <span>Import a JSON backup from this app.</span>
              </div>
              <label class="ghost-action">
                ${icon("refresh")} Restore
                <input type="file" accept="application/json" data-restore hidden>
              </label>
            </div>
            <div class="record-line">
              <div>
                <strong>Reset sample data</strong>
                <span>Recreate the original starter dataset.</span>
              </div>
              <button class="ghost-action" type="button" data-reset-demo>${icon("refresh")} Reset</button>
            </div>
          </div>
        </section>
      </div>
      <section class="data-panel">
        <div class="panel-header">
          <div>
            <h3>Supabase Preparation</h3>
            <p>Use database/schema.sql and .env.example when moving from LocalStorage to a hosted backend.</p>
          </div>
        </div>
        <div class="record-list">
          <div class="record-line">
            <div>
              <strong>Authentication</strong>
              <span>Magic link login can be wired through Supabase Auth.</span>
            </div>
            ${status("Prepared")}
          </div>
          <div class="record-line">
            <div>
              <strong>Tables</strong>
              <span>Users, drivers, investors, vehicles, remittances, maintenance, invoices, and audit logs are modeled.</span>
            </div>
            ${status("Prepared")}
          </div>
        </div>
      </section>
    `;
  }

  function toolbar(placeholder) {
    return `
      <div class="toolbar no-print">
        <div class="search">
          <label class="field-label" for="pageSearch">Search</label>
          <input id="pageSearch" type="search" value="${escapeHtml(state.query)}" placeholder="${escapeHtml(placeholder)}">
        </div>
      </div>
    `;
  }

  function applySearch(list, keys, extra) {
    const query = state.query.trim().toLowerCase();
    if (!query) return list;
    return list.filter((item) => {
      const haystack = [
        ...keys.map((key) => item[key]),
        typeof extra === "function" ? extra(item) : ""
      ].join(" ").toLowerCase();
      return haystack.includes(query);
    });
  }

  function table(headers, rows) {
    return `
      <div class="table-wrap">
        <table>
          <thead><tr>${headers.map((header) => `<th>${escapeHtml(header)}</th>`).join("")}</tr></thead>
          <tbody>
            ${rows.map((cells) => `<tr>${cells.map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  function rowActions(entity, id, allowed, includePreview) {
    const preview = includePreview ? `<button class="table-action" type="button" data-select-invoice="${id}">${icon("receipt")} Preview</button>` : "";
    if (!allowed) return `<div class="inline-actions">${preview}</div>`;
    return `
      <div class="inline-actions">
        ${preview}
        <button class="table-action" type="button" data-edit="${entity}" data-id="${id}">${icon("edit")} Edit</button>
        <button class="table-action danger" type="button" data-delete="${entity}" data-id="${id}">${icon("trash")} Delete</button>
      </div>
    `;
  }

  function emptyState() {
    return $("#emptyStateTemplate").innerHTML;
  }

  function emptyCompact(text) {
    return `<div class="record-line"><div><strong>${escapeHtml(text)}</strong><span>Nothing requires action right now.</span></div>${status("Active")}</div>`;
  }

  function groupBy(list, key) {
    return list.reduce((acc, item) => {
      const value = item[key];
      acc[value] = acc[value] || [];
      acc[value].push(item);
      return acc;
    }, {});
  }

  function bindPageEvents() {
    const content = $("#pageContent");
    const actions = $("#pageActions");
    [content, actions].forEach((root) => {
      if (!root) return;
      root.addEventListener("click", handlePageClick);
      root.addEventListener("input", handlePageInput);
      root.addEventListener("change", handlePageChange);
      root.addEventListener("submit", handlePageSubmit);
    });
    const search = $("#pageSearch");
    if (search) {
      search.addEventListener("input", (event) => {
        state.query = event.target.value;
        renderPage();
      }, { once: true });
    }
  }

  function handlePageClick(event) {
    const modalButton = event.target.closest("[data-modal]");
    if (modalButton) openModal(modalButton.dataset.modal);

    const editButton = event.target.closest("[data-edit]");
    if (editButton) openModal(editButton.dataset.edit, editButton.dataset.id);

    const deleteButton = event.target.closest("[data-delete]");
    if (deleteButton) deleteRecord(deleteButton.dataset.delete, deleteButton.dataset.id);

    const invoiceButton = event.target.closest("[data-select-invoice]");
    if (invoiceButton) {
      state.selectedInvoiceId = invoiceButton.dataset.selectInvoice;
      renderInvoices();
    }

    if (event.target.closest("[data-print-invoice]") || event.target.closest("[data-print-report]")) window.print();
    if (event.target.closest("[data-open-report]")) setPage("reports");
    if (event.target.closest("[data-apply-report]")) applyReportFilters();
    if (event.target.closest("[data-export-csv]")) exportCsv();
    if (event.target.closest("[data-backup]")) backupData();
    if (event.target.closest("[data-reset-demo]")) resetDemo();
  }

  function handlePageInput(event) {
    if (event.target.closest("#invoiceForm")) {
      updateInvoiceLivePreview();
    }
  }

  function handlePageChange(event) {
    if (event.target.matches("[data-restore]")) restoreData(event.target.files[0]);
  }

  function handlePageSubmit(event) {
    if (event.target.id === "settingsForm") {
      event.preventDefault();
      const form = new FormData(event.target);
      state.db.settings = {
        ...state.db.settings,
        companyName: String(form.get("companyName")),
        currency: String(form.get("currency")),
        phone: String(form.get("phone")),
        email: String(form.get("email")),
        address: String(form.get("address"))
      };
      audit("Updated company settings");
      writeDb();
      toast("Settings saved.");
      renderShell();
      renderPage();
    }
  }

  function openModal(entity, id) {
    const config = modalConfig(entity, id);
    if (!config) return;
    $("#modalEyebrow").textContent = config.eyebrow;
    $("#modalTitle").textContent = config.title;
    $("#modalBody").innerHTML = config.body;
    $("#modalRoot").hidden = false;
    hydrateIcons($("#modalRoot"));
    const form = $("#modalBody form");
    if (form) {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        config.save(new FormData(form));
      });
      if (entity === "invoice") {
        form.addEventListener("input", updateInvoiceLivePreview);
        updateInvoiceLivePreview();
      }
    }
  }

  function closeModal() {
    $("#modalRoot").hidden = true;
    $("#modalBody").innerHTML = "";
  }

  function input(name, label, value, type, attrs) {
    return `
      <div>
        <label for="${name}">${label}</label>
        <input id="${name}" name="${name}" type="${type || "text"}" value="${escapeHtml(value ?? "")}" ${attrs || ""}>
      </div>
    `;
  }

  function select(name, label, value, options, attrs) {
    return `
      <div>
        <label for="${name}">${label}</label>
        <select id="${name}" name="${name}" ${attrs || ""}>
          ${options.map((option) => {
            const opt = typeof option === "string" ? { value: option, label: option } : option;
            return `<option value="${escapeHtml(opt.value)}" ${String(value ?? "") === String(opt.value) ? "selected" : ""}>${escapeHtml(opt.label)}</option>`;
          }).join("")}
        </select>
      </div>
    `;
  }

  function textarea(name, label, value) {
    return `
      <div class="full">
        <label for="${name}">${label}</label>
        <textarea id="${name}" name="${name}">${escapeHtml(value ?? "")}</textarea>
      </div>
    `;
  }

  function formShell(fields, saveText) {
    return `
      <form class="form-grid">
        ${fields}
        <div class="form-actions full">
          <button class="ghost-action" type="button" data-close-modal>${icon("x")} Cancel</button>
          <button class="primary-action" type="submit">${icon("check")} ${escapeHtml(saveText || "Save record")}</button>
        </div>
      </form>
    `;
  }

  function modalConfig(entity, id) {
    const entityMap = {
      vehicle: vehicleModal,
      driver: driverModal,
      investor: investorModal,
      remittance: remittanceModal,
      maintenance: maintenanceModal,
      invoice: invoiceModal,
      user: userModal
    };
    return entityMap[entity]?.(id);
  }

  function vehicleModal(id) {
    const item = byId(state.db.vehicles, id) || {};
    return {
      eyebrow: id ? "Edit vehicle" : "New vehicle",
      title: id ? item.plate : "Register vehicle",
      body: formShell(`
        ${input("plate", "Registration plate", item.plate, "text", "required")}
        ${input("category", "Category", item.category || "PSV Van", "text", "required")}
        ${input("make", "Make", item.make, "text", "required")}
        ${input("model", "Model", item.model, "text", "required")}
        ${input("year", "Year", item.year, "number", "min='1990' max='2100' required")}
        ${input("mileage", "Mileage", item.mileage, "number", "min='0'")}
        ${select("status", "Status", item.status || "Active", ["Active", "Maintenance", "Inactive"], "required")}
        ${input("dailyTarget", "Daily target", item.dailyTarget || state.db.settings.dailyTargetDefault, "number", "min='0' required")}
        ${select("driverId", "Assigned driver", item.driverId, [{ value: "", label: "Unassigned" }, ...state.db.drivers.map((driver) => ({ value: driver.id, label: driver.name }))])}
        ${select("investorId", "Investor owner", item.investorId, [{ value: "", label: "Unassigned" }, ...state.db.investors.map((investor) => ({ value: investor.id, label: investor.name }))])}
        ${input("nextServiceDate", "Next service date", item.nextServiceDate || today(), "date")}
        ${input("acquisitionCost", "Acquisition cost", item.acquisitionCost, "number", "min='0'")}
      `, id ? "Update vehicle" : "Save vehicle"),
      save: (form) => saveVehicle(id, form)
    };
  }

  function driverModal(id) {
    const item = byId(state.db.drivers, id) || {};
    return {
      eyebrow: id ? "Edit driver" : "New driver",
      title: id ? item.name : "Add driver",
      body: formShell(`
        ${input("name", "Driver name", item.name, "text", "required")}
        ${input("staffNo", "Staff number", item.staffNo || nextCode("DRV", state.db.drivers.length + 1), "text", "required")}
        ${input("phone", "Phone", item.phone, "text")}
        ${input("license", "License number", item.license, "text", "required")}
        ${select("status", "Status", item.status || "Active", ["Active", "Maintenance", "Inactive"], "required")}
        ${input("targetDaily", "Daily target", item.targetDaily || state.db.settings.dailyTargetDefault, "number", "min='0' required")}
        ${input("joinDate", "Join date", item.joinDate || today(), "date")}
        ${select("assignedVehicleId", "Assigned vehicle", item.assignedVehicleId, [{ value: "", label: "Unassigned" }, ...state.db.vehicles.map((vehicle) => ({ value: vehicle.id, label: vehicle.plate }))])}
      `, id ? "Update driver" : "Save driver"),
      save: (form) => saveDriver(id, form)
    };
  }

  function investorModal(id) {
    const item = byId(state.db.investors, id) || {};
    return {
      eyebrow: id ? "Edit investor" : "New investor",
      title: id ? item.name : "Add investor",
      body: formShell(`
        ${input("name", "Investor name", item.name, "text", "required")}
        ${input("phone", "Phone", item.phone, "text")}
        ${input("email", "Email", item.email, "email")}
        ${select("payoutMethod", "Payout method", item.payoutMethod || "Bank", ["Bank", "M-Pesa", "Cash", "Cheque"])}
        ${select("status", "Status", item.status || "Active", ["Active", "Inactive"], "required")}
      `, id ? "Update investor" : "Save investor"),
      save: (form) => saveInvestor(id, form)
    };
  }

  function remittanceModal(id) {
    const item = byId(state.db.remittances, id) || {};
    return {
      eyebrow: id ? "Edit remittance" : "New remittance",
      title: id ? item.reference : "Record remittance",
      body: formShell(`
        ${input("date", "Payment date", item.date || today(), "date", "required")}
        ${select("driverId", "Driver", item.driverId, state.db.drivers.map((driver) => ({ value: driver.id, label: driver.name })), "required")}
        ${select("vehicleId", "Vehicle", item.vehicleId, state.db.vehicles.map((vehicle) => ({ value: vehicle.id, label: vehicle.plate })), "required")}
        ${select("period", "Period", item.period || "Daily", ["Daily", "Weekly", "Monthly"], "required")}
        ${input("amount", "Amount", item.amount, "number", "min='0' required")}
        ${select("method", "Payment method", item.method || "M-Pesa", ["M-Pesa", "Cash", "Bank", "Cheque"], "required")}
        ${input("reference", "Reference", item.reference || nextCode("PAY", state.db.remittances.length + 1), "text")}
        ${select("status", "Status", item.status || "Paid", ["Paid", "Pending", "Cancelled"], "required")}
        ${textarea("note", "Notes", item.note)}
      `, id ? "Update remittance" : "Save remittance"),
      save: (form) => saveRemittance(id, form)
    };
  }

  function maintenanceModal(id) {
    const item = byId(state.db.maintenance, id) || {};
    return {
      eyebrow: id ? "Edit maintenance" : "New maintenance",
      title: id ? item.type : "Log maintenance",
      body: formShell(`
        ${select("vehicleId", "Vehicle", item.vehicleId, state.db.vehicles.map((vehicle) => ({ value: vehicle.id, label: vehicle.plate })), "required")}
        ${input("date", "Service date", item.date || today(), "date", "required")}
        ${input("type", "Service type", item.type, "text", "required")}
        ${input("provider", "Provider", item.provider, "text", "required")}
        ${input("cost", "Cost", item.cost, "number", "min='0' required")}
        ${input("odometer", "Odometer", item.odometer, "number", "min='0'")}
        ${input("nextDue", "Next due date", item.nextDue || addDays(30), "date")}
        ${select("status", "Status", item.status || "Completed", ["Completed", "Scheduled", "Pending", "Cancelled"], "required")}
        ${textarea("notes", "Notes", item.notes)}
      `, id ? "Update maintenance" : "Save maintenance"),
      save: (form) => saveMaintenance(id, form)
    };
  }

  function invoiceModal(id) {
    const item = byId(state.db.invoices, id) || {
      number: nextInvoiceNumber(),
      date: today(),
      dueDate: addDays(7),
      type: "Maintenance",
      status: "Pending",
      qty: 1,
      unitPrice: 0
    };
    const firstItem = item.items?.[0] || {};
    return {
      eyebrow: id ? "Edit invoice" : "New invoice",
      title: id ? item.number : "Create invoice",
      body: `
        <form id="invoiceForm" class="form-grid">
          ${input("number", "Invoice number", item.number, "text", "required")}
          ${select("type", "Invoice type", item.type, ["Maintenance", "Remittance", "Investor Earnings"], "required")}
          ${input("partyName", "Bill to", item.partyName, "text", "required")}
          ${input("relatedId", "Related vehicle or investor ID", item.relatedId, "text")}
          ${input("date", "Issue date", item.date || today(), "date", "required")}
          ${input("dueDate", "Due date", item.dueDate || addDays(7), "date", "required")}
          ${select("status", "Status", item.status || "Pending", ["Pending", "Paid", "Overdue", "Cancelled"], "required")}
          ${input("description", "Line description", firstItem.description || "", "text", "required")}
          ${input("qty", "Quantity", firstItem.qty || 1, "number", "min='0' step='1' required")}
          ${input("unitPrice", "Unit price", firstItem.unitPrice || 0, "number", "min='0' required")}
          ${textarea("notes", "Notes", item.notes)}
          <div class="full invoice-preview" id="invoiceLivePreview"></div>
          <div class="form-actions full">
            <button class="ghost-action" type="button" data-close-modal>${icon("x")} Cancel</button>
            <button class="primary-action" type="submit">${icon("check")} ${id ? "Update invoice" : "Save invoice"}</button>
          </div>
        </form>
      `,
      save: (form) => saveInvoice(id, form)
    };
  }

  function userModal(id) {
    const item = byId(state.db.users, id) || {};
    return {
      eyebrow: id ? "Edit user" : "New user",
      title: id ? item.name : "Add user",
      body: formShell(`
        ${input("name", "Full name", item.name, "text", "required")}
        ${input("email", "Email", item.email, "email", "required")}
        ${input("password", "Password", item.password, "text", "required")}
        ${select("role", "Role", item.role || "staff", Object.entries(roleLabels).map(([value, label]) => ({ value, label })), "required")}
        ${select("active", "Status", item.active === false ? "false" : "true", [{ value: "true", label: "Active" }, { value: "false", label: "Inactive" }])}
        ${select("driverId", "Linked driver", item.driverId, [{ value: "", label: "None" }, ...state.db.drivers.map((driver) => ({ value: driver.id, label: driver.name }))])}
        ${select("investorId", "Linked investor", item.investorId, [{ value: "", label: "None" }, ...state.db.investors.map((investor) => ({ value: investor.id, label: investor.name }))])}
      `, id ? "Update user" : "Save user"),
      save: (form) => saveUser(id, form)
    };
  }

  function nextCode(prefix, count) {
    return `${prefix}-${String(count).padStart(3, "0")}`;
  }

  function nextInvoiceNumber() {
    return `MTF-${new Date().getFullYear()}-${String(state.db.invoices.length + 1).padStart(3, "0")}`;
  }

  function formValue(form, key) {
    return String(form.get(key) || "").trim();
  }

  function formNumber(form, key) {
    return Number(form.get(key) || 0);
  }

  function upsert(listName, id, item, label, beforeRender) {
    const list = state.db[listName];
    const index = list.findIndex((record) => record.id === id);
    const savedId = index >= 0 ? id : makeId(label.slice(0, 1));
    if (index >= 0) {
      list[index] = { ...list[index], ...item, id };
      audit(`Updated ${label}`);
    } else {
      list.unshift({ ...item, id: savedId });
      audit(`Created ${label}`);
    }
    if (typeof beforeRender === "function") beforeRender(savedId);
    writeDb();
    closeModal();
    toast("Record saved.");
    renderShell();
    renderPage();
    return savedId;
  }

  function saveVehicle(id, form) {
    const item = {
      plate: formValue(form, "plate").toUpperCase(),
      category: formValue(form, "category"),
      make: formValue(form, "make"),
      model: formValue(form, "model"),
      year: formNumber(form, "year"),
      mileage: formNumber(form, "mileage"),
      status: formValue(form, "status"),
      dailyTarget: formNumber(form, "dailyTarget"),
      driverId: formValue(form, "driverId"),
      investorId: formValue(form, "investorId"),
      nextServiceDate: formValue(form, "nextServiceDate"),
      acquisitionCost: formNumber(form, "acquisitionCost")
    };
    upsert("vehicles", id, item, "vehicle", syncAssignments);
  }

  function saveDriver(id, form) {
    const item = {
      name: formValue(form, "name"),
      staffNo: formValue(form, "staffNo"),
      phone: formValue(form, "phone"),
      license: formValue(form, "license"),
      status: formValue(form, "status"),
      targetDaily: formNumber(form, "targetDaily"),
      joinDate: formValue(form, "joinDate"),
      assignedVehicleId: formValue(form, "assignedVehicleId")
    };
    upsert("drivers", id, item, "driver", syncAssignments);
  }

  function saveInvestor(id, form) {
    const item = {
      name: formValue(form, "name"),
      phone: formValue(form, "phone"),
      email: formValue(form, "email"),
      payoutMethod: formValue(form, "payoutMethod"),
      status: formValue(form, "status")
    };
    upsert("investors", id, item, "investor");
  }

  function saveRemittance(id, form) {
    const item = {
      date: formValue(form, "date"),
      driverId: formValue(form, "driverId"),
      vehicleId: formValue(form, "vehicleId"),
      period: formValue(form, "period"),
      amount: formNumber(form, "amount"),
      method: formValue(form, "method"),
      reference: formValue(form, "reference"),
      status: formValue(form, "status"),
      note: formValue(form, "note")
    };
    upsert("remittances", id, item, "remittance");
  }

  function saveMaintenance(id, form) {
    const item = {
      vehicleId: formValue(form, "vehicleId"),
      date: formValue(form, "date"),
      type: formValue(form, "type"),
      provider: formValue(form, "provider"),
      cost: formNumber(form, "cost"),
      odometer: formNumber(form, "odometer"),
      nextDue: formValue(form, "nextDue"),
      status: formValue(form, "status"),
      notes: formValue(form, "notes")
    };
    const vehicle = byId(state.db.vehicles, item.vehicleId);
    if (vehicle && item.nextDue) vehicle.nextServiceDate = item.nextDue;
    if (vehicle && item.status === "Scheduled") vehicle.status = "Maintenance";
    upsert("maintenance", id, item, "maintenance");
  }

  function saveInvoice(id, form) {
    const item = {
      number: formValue(form, "number"),
      type: formValue(form, "type"),
      partyName: formValue(form, "partyName"),
      relatedId: formValue(form, "relatedId"),
      date: formValue(form, "date"),
      dueDate: formValue(form, "dueDate"),
      status: formValue(form, "status"),
      notes: formValue(form, "notes"),
      items: [{
        description: formValue(form, "description"),
        qty: formNumber(form, "qty"),
        unitPrice: formNumber(form, "unitPrice")
      }]
    };
    upsert("invoices", id, item, "invoice", (savedId) => {
      state.selectedInvoiceId = savedId;
    });
  }

  function saveUser(id, form) {
    const item = {
      name: formValue(form, "name"),
      email: formValue(form, "email"),
      password: formValue(form, "password"),
      role: formValue(form, "role"),
      active: formValue(form, "active") === "true",
      driverId: formValue(form, "driverId"),
      investorId: formValue(form, "investorId")
    };
    upsert("users", id, item, "user");
  }

  function syncAssignments() {
    state.db.vehicles.forEach((vehicle) => {
      const driver = state.db.drivers.find((item) => item.assignedVehicleId === vehicle.id);
      if (driver && vehicle.driverId !== driver.id) vehicle.driverId = driver.id;
    });
    state.db.drivers.forEach((driver) => {
      const vehicle = state.db.vehicles.find((item) => item.driverId === driver.id);
      if (vehicle && driver.assignedVehicleId !== vehicle.id) driver.assignedVehicleId = vehicle.id;
    });
    writeDb();
  }

  function deleteRecord(entity, id) {
    const map = {
      vehicle: "vehicles",
      driver: "drivers",
      investor: "investors",
      remittance: "remittances",
      maintenance: "maintenance",
      invoice: "invoices",
      user: "users"
    };
    const listName = map[entity];
    if (!listName) return;
    const protectedUser = entity === "user" && id === currentUser()?.id;
    if (protectedUser) {
      toast("You cannot delete the active user.");
      return;
    }
    const ok = window.confirm(`Delete this ${entity} record?`);
    if (!ok) return;
    state.db[listName] = state.db[listName].filter((item) => item.id !== id);
    audit(`Deleted ${entity}`);
    writeDb();
    toast("Record deleted.");
    renderPage();
  }

  function updateInvoiceLivePreview() {
    const form = $("#invoiceForm");
    const target = $("#invoiceLivePreview");
    if (!form || !target) return;
    const data = new FormData(form);
    const invoice = {
      number: formValue(data, "number"),
      type: formValue(data, "type"),
      partyName: formValue(data, "partyName"),
      date: formValue(data, "date"),
      dueDate: formValue(data, "dueDate"),
      status: formValue(data, "status"),
      notes: formValue(data, "notes"),
      items: [{ description: formValue(data, "description"), qty: formNumber(data, "qty"), unitPrice: formNumber(data, "unitPrice") }]
    };
    target.innerHTML = invoicePreview(invoice);
    hydrateIcons(target);
  }

  function applyReportFilters() {
    state.reportRange = $("#reportRange").value;
    state.reportStart = $("#reportStart").value;
    state.reportEnd = $("#reportEnd").value;
    renderReports();
  }

  function exportCsv() {
    const range = reportDates();
    const rows = getScopedRemittances()
      .filter((item) => inRange(item.date, range.start, range.end))
      .map((item) => ({
        date: item.date,
        driver: driverName(item.driverId),
        vehicle: vehiclePlate(item.vehicleId),
        period: item.period,
        amount: item.amount,
        method: item.method,
        reference: item.reference,
        status: item.status
      }));
    const csv = [
      Object.keys(rows[0] || { date: "", driver: "", vehicle: "", period: "", amount: "", method: "", reference: "", status: "" }).join(","),
      ...rows.map((row) => Object.values(row).map(csvCell).join(","))
    ].join("\n");
    downloadBlob(csv, `metrotrust-remittances-${today()}.csv`, "text/csv");
  }

  function csvCell(value) {
    return `"${String(value ?? "").replaceAll('"', '""')}"`;
  }

  function backupData() {
    downloadBlob(JSON.stringify(state.db, null, 2), `metrotrust-backup-${today()}.json`, "application/json");
  }

  function restoreData(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const imported = JSON.parse(reader.result);
        if (!imported.users || !imported.vehicles) throw new Error("Invalid backup");
        state.db = imported;
        audit("Restored database backup");
        writeDb();
        toast("Backup restored.");
        renderShell();
        renderPage();
      } catch (error) {
        toast("Restore failed. Use a valid MetroTrust JSON backup.");
      }
    };
    reader.readAsText(file);
  }

  function resetDemo() {
    const ok = window.confirm("Reset sample data and clear all local changes?");
    if (!ok) return;
    state.db = seedData();
    writeDb();
    toast("Sample data reset.");
    renderShell();
    renderPage();
  }

  function downloadBlob(content, filename, type) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  init();
})();
