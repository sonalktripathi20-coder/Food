// FoodConnect Bharat — Interactive Client Engine

let currentRole = 'DONOR';
let currentTab = 'map-view';
let map = null;
let markersGroup = null;
let volunteerMarker = null;
let routeSimulationTimer = null;

let notifications = [
    { id: 'n1', recipientRole: 'DONOR', title: '🔔 New Food Request', message: '10 Jain meals requested in Karol Bagh (2.1 km away).', read: false, time: '10:32 AM' },
    { id: 'n2', recipientRole: 'BENEFICIARY', title: '🎉 Donor Accepted', message: 'Demo Restaurant accepted your request for 10 Jain meals.', read: false, time: '10:33 AM' },
    { id: 'n3', recipientRole: 'VOLUNTEER', title: '🚴 New Delivery Task Available', message: '10 Jain Meals: Demo Restaurant ➔ Karol Bagh', read: false, time: '10:35 AM' }
];

let donations = [
    {
        id: 'don_101',
        donorName: 'Jain Bhojanalaya',
        donorType: 'Restaurant',
        foodName: 'Pure Jain Dal Fry & Khichdi',
        totalServings: 40,
        allocatedServings: 10,
        remainingServings: 30,
        dietary: 'JAIN',
        usableRemainingHours: 3.5,
        isEmergency: false,
        pickupAddress: 'Karol Bagh, New Delhi',
        latitude: 28.652,
        longitude: 77.19,
        imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80',
        lifecycleState: 'AVAILABLE'
    },
    {
        id: 'don_102',
        donorName: 'Royal Grand Banquet Hall',
        donorType: 'Wedding',
        foodName: 'Wedding Feast Buffet (Paneer & Pulao)',
        totalServings: 350,
        allocatedServings: 120,
        remainingServings: 230,
        dietary: 'VEG',
        usableRemainingHours: 1.5,
        isEmergency: true,
        pickupAddress: 'Sector 62, Noida',
        latitude: 28.627,
        longitude: 77.372,
        imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
        lifecycleState: 'AVAILABLE'
    }
];

let requests = [
    {
        id: 'req_demo',
        beneficiaryName: 'Karol Bagh Shelter',
        peopleCount: 10,
        dietary: 'JAIN',
        locationAddress: 'Karol Bagh Market, Delhi',
        latitude: 28.654,
        longitude: 77.195,
        urgency: 'NORMAL',
        status: 'AVAILABLE'
    }
];

let deliveries = [
    {
        id: 'del_demo',
        foodName: '10 Jain Meals',
        servings: 10,
        donorName: 'Jain Bhojanalaya',
        beneficiaryName: 'Karol Bagh Shelter',
        state: 'VOLUNTEER_SEARCH',
        pickupAddress: 'Karol Bagh, Delhi',
        deliveryAddress: 'Karol Bagh Market, Delhi'
    }
];

document.addEventListener('DOMContentLoaded', () => {
    initIcons();
    initMap();
    renderAllViews();
    setupClickOutsideNotificationHandler();
});

function initIcons() {
    if (window.lucide) lucide.createIcons();
}

function initMap() {
    const mapElem = document.getElementById('main-map');
    if (!mapElem) return;

    map = L.map('main-map').setView([28.64, 77.21], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap | FoodConnect Bharat'
    }).addTo(map);

    markersGroup = L.layerGroup().addTo(map);
    renderMapMarkers();
}

function renderMapMarkers() {
    if (!markersGroup || !map) return;
    markersGroup.clearLayers();

    donations.forEach(don => {
        const customIcon = L.divIcon({
            className: 'custom-leaflet-marker marker-green w-8 h-8 rounded-full flex items-center justify-center shadow-lg',
            html: `<span>🍱</span>`,
            iconSize: [32, 32]
        });
        const marker = L.marker([don.latitude, don.longitude], { icon: customIcon });
        marker.bindPopup(`
      <div class="p-2 text-xs space-y-1">
        <span class="font-extrabold text-slate-900 block">${don.foodName}</span>
        <span class="text-emerald-700 font-bold">${don.remainingServings} Servings (${don.dietary})</span>
      </div>
    `);
        markersGroup.addLayer(marker);
    });

    requests.forEach(req => {
        const customIcon = L.divIcon({
            className: 'custom-leaflet-marker marker-red w-8 h-8 rounded-full flex items-center justify-center shadow-lg',
            html: `<span>🙏</span>`,
            iconSize: [32, 32]
        });
        const marker = L.marker([req.latitude, req.longitude], { icon: customIcon });
        marker.bindPopup(`
      <div class="p-2 text-xs">
        <span class="font-extrabold text-slate-900 block">${req.beneficiaryName}</span>
        <span class="text-red-600 font-bold">Request: ${req.peopleCount} ${req.dietary} Meals</span>
      </div>
    `);
        markersGroup.addLayer(marker);
    });
}

function switchRole(role) {
    currentRole = role;
    document.querySelectorAll('.role-btn').forEach(btn => {
        btn.classList.remove('bg-orange-500', 'text-white');
        btn.classList.add('text-slate-300');
    });

    const activeBtn = document.getElementById(`role-${role.toLowerCase()}-btn`);
    if (activeBtn) {
        activeBtn.classList.remove('text-slate-300');
        activeBtn.classList.add('bg-orange-500', 'text-white');
    }

    updateNotificationBadge();
    showToast(`Switched to <strong>${role}</strong> view`, 'info');

    if (role === 'DONOR') showTab('share-food');
    else if (role === 'BENEFICIARY') showTab('request-food');
    else if (role === 'VOLUNTEER') showTab('volunteer-tasks');
    else if (role === 'NGO') showTab('ngo-ops');
    else if (role === 'ADMIN') showTab('admin-panel');
}

function showTab(tabId) {
    currentTab = tabId;
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));

    const targetView = document.getElementById(`view-${tabId}`);
    if (targetView) targetView.classList.remove('hidden');

    document.querySelectorAll('.nav-tab').forEach(btn => {
        btn.classList.remove('text-orange-600', 'font-bold', 'border-b-2', 'border-orange-500');
        btn.classList.add('text-slate-600');
    });

    const activeTabBtn = document.getElementById(`tab-${tabId}`);
    if (activeTabBtn) {
        activeTabBtn.classList.add('text-orange-600', 'font-bold', 'border-b-2', 'border-orange-500');
        activeTabBtn.classList.remove('text-slate-600');
    }

    if (tabId === 'map-view' && map) {
        setTimeout(() => map.invalidateSize(), 200);
    }
}

function startSimulatedRoute() {
    showTab('map-view');
    showToast('🚴 Volunteer route simulation started on map!', 'info');

    const donorLat = 28.652, donorLng = 77.19;
    const benLat = 28.654, benLng = 77.195;

    let step = 0;
    const totalSteps = 40;

    if (volunteerMarker && map) {
        map.removeLayer(volunteerMarker);
    }

    const customIcon = L.divIcon({
        className: 'custom-leaflet-marker marker-volunteer w-9 h-9 rounded-full flex items-center justify-center shadow-2xl border-2 border-white animate-bounce',
        html: `<span>🚴</span>`,
        iconSize: [36, 36]
    });

    volunteerMarker = L.marker([donorLat, donorLng], { icon: customIcon }).addTo(map);
    volunteerMarker.bindPopup(`
    <div class="p-2 text-xs">
      <span class="font-extrabold text-sky-600 block">🚴 Volunteer (In Transit)</span>
      <p class="text-slate-600">Delivering 10 Jain Meals to Karol Bagh Market</p>
      <span class="text-emerald-600 font-bold block mt-1">ETA: 4 mins</span>
    </div>
  `).openPopup();

    if (routeSimulationTimer) clearInterval(routeSimulationTimer);

    routeSimulationTimer = setInterval(() => {
        step++;
        const progress = step / totalSteps;
        const currentLat = donorLat + (benLat - donorLat) * progress;
        const currentLng = donorLng + (benLng - donorLng) * progress;

        if (volunteerMarker) {
            volunteerMarker.setLatLng([currentLat, currentLng]);
        }

        if (step >= totalSteps) {
            clearInterval(routeSimulationTimer);
            showToast('📍 Volunteer arrived at Beneficiary destination!', 'success');
            if (volunteerMarker) {
                volunteerMarker.getPopup().setContent(`
          <div class="p-2 text-xs">
            <span class="font-extrabold text-emerald-600 block">📍 Volunteer Arrived!</span>
            <p class="text-slate-800">Delivered 10 Jain Meals</p>
          </div>
        `).openPopup();
            }
        }
    }, 150);
}

function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast-item bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 text-xs flex items-center space-x-2 max-w-sm`;

    let icon = '🔔';
    if (type === 'success') icon = '🎉';
    if (type === 'info') icon = 'ℹ️';

    toast.innerHTML = `
    <span class="text-base">${icon}</span>
    <span class="flex-1">${message}</span>
  `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

function updateNotificationBadge() {
    const roleNotifs = notifications.filter(n => n.recipientRole === currentRole && !n.read);
    const badge = document.getElementById('notif-badge');
    if (badge) {
        badge.innerText = roleNotifs.length;
        if (roleNotifs.length === 0) badge.classList.add('hidden');
        else badge.classList.remove('hidden');
    }

    const listContainer = document.getElementById('notification-list-container');
    if (listContainer) {
        if (notifications.length === 0) {
            listContainer.innerHTML = `<p class="text-slate-400 text-center py-4">No notifications yet.</p>`;
        } else {
            listContainer.innerHTML = notifications.map(n => `
        <div class="p-2.5 rounded-2xl ${n.recipientRole === currentRole ? 'bg-orange-50 border border-orange-200' : 'bg-slate-50 border border-slate-200'} space-y-1">
          <div class="flex justify-between font-extrabold text-slate-900">
            <span>${n.title}</span>
            <span class="text-[10px] text-slate-400">${n.time}</span>
          </div>
          <p class="text-slate-600 text-[11px]">${n.message}</p>
        </div>
      `).join('');
        }
    }
}

function toggleNotificationCenter(event) {
    if (event) event.stopPropagation();
    const el = document.getElementById('notification-center');
    if (el) el.classList.toggle('hidden');
}

function closeNotificationCenter() {
    const el = document.getElementById('notification-center');
    if (el) el.classList.add('hidden');
}

function setupClickOutsideNotificationHandler() {
    document.addEventListener('click', (e) => {
        const notifCenter = document.getElementById('notification-center');
        const notifBtn = document.getElementById('notif-btn');
        if (!notifCenter || notifCenter.classList.contains('hidden')) return;

        if (!notifCenter.contains(e.target) && !notifBtn.contains(e.target)) {
            notifCenter.classList.add('hidden');
        }
    });
}

function clearNotifications() {
    notifications.forEach(n => n.read = true);
    updateNotificationBadge();
}

function handleFoodDonationSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('don-name').value;
    const food = document.getElementById('don-food-name').value;
    const servings = parseInt(document.getElementById('don-servings').value);

    donations.unshift({
        id: `don_${Date.now()}`,
        donorName: name,
        foodName: food,
        totalServings: servings,
        allocatedServings: 0,
        remainingServings: servings,
        dietary: 'JAIN',
        usableRemainingHours: 3.5,
        isEmergency: false,
        pickupAddress: 'Karol Bagh, Delhi',
        latitude: 28.65,
        longitude: 77.19,
        imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80',
        lifecycleState: 'AVAILABLE'
    });

    renderAllViews();
    showToast(`🍱 Posted ${servings} servings of ${food}!`, 'success');
    showTab('map-view');
}

function handleFoodRequestSubmit(e) {
    e.preventDefault();
    showToast('🙏 Food request broadcasted to nearby donors!', 'success');
    showTab('map-view');
}

function renderAllViews() {
    updateNotificationBadge();
    renderVolunteerTasks();
    initIcons();
}

function renderVolunteerTasks() {
    const container = document.getElementById('volunteer-tasks-container');
    if (!container) return;

    container.innerHTML = deliveries.map(del => `
    <div class="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3 text-xs">
      <div class="flex justify-between font-bold text-slate-900">
        <span>Delivery Task #${del.id}</span>
        <span class="bg-teal-100 text-teal-800 px-2 py-0.5 rounded">Active Task</span>
      </div>
      <p class="font-extrabold text-slate-900 text-sm">${del.foodName} (${del.servings} Servings)</p>
      <p class="text-slate-600">Pickup: ${del.pickupAddress} ➔ Delivery: ${del.deliveryAddress}</p>
      <button onclick="startSimulatedRoute()" class="bg-sky-600 text-white font-extrabold px-3 py-1.5 rounded-xl">
        Simulate Route Movement
      </button>
    </div>
  `).join('');
}

function openEmergencyRescueModal() {
    showToast('🚨 Emergency Rescue Form Opened', 'info');
}
