// Realistic Demo & Seed Dataset for FoodConnect Bharat

export interface SeedDonation {
    id: string;
    donorName: string;
    donorType: 'Restaurant' | 'Wedding' | 'Bhandara' | 'Community Kitchen' | 'Home' | 'Hotel';
    foodName: string;
    category: string;
    quantity: string;
    servingsCount: number;
    dietary: 'VEG' | 'JAIN' | 'NON_VEG';
    usableRemainingHours: number;
    isEmergency: boolean;
    pickupAddress: string;
    latitude: number;
    longitude: number;
    packagingCondition: string;
    notes?: string;
    createdAt: string;
}

export interface SeedRequest {
    id: string;
    beneficiaryName: string;
    beneficiaryType: 'Individual' | 'Family' | 'Shelter' | 'Community' | 'NGO';
    peopleCount: number;
    dietary: 'VEG' | 'JAIN' | 'NON_VEG';
    noOnionGarlic?: boolean;
    urgency: 'NORMAL' | 'URGENT' | 'EMERGENCY';
    locationAddress: string;
    latitude: number;
    longitude: number;
    priorityGroup?: string; // Children, Women, Elderly
    notes?: string;
    contactPhone: string;
    createdAt: string;
}

export interface SeedBhandaraEvent {
    id: string;
    eventName: string;
    organizer: string;
    eventType: 'Bhandara' | 'Langar' | 'Community Feast' | 'Wedding Surplus';
    address: string;
    latitude: number;
    longitude: number;
    eventDate: string;
    timing: string;
    estimatedMeals: number;
    dietary: 'VEG' | 'JAIN';
    contactPhone: string;
    surplusExpected: boolean;
}

export interface SeedCommunityKitchen {
    id: string;
    name: string;
    organization: string;
    address: string;
    latitude: number;
    longitude: number;
    openingHours: string;
    capacityServings: number;
    currentAvailable: number;
    dietary: 'VEG' | 'JAIN';
    contactPhone: string;
}

export interface SeedOfflineArea {
    id: string;
    areaName: string;
    address: string;
    latitude: number;
    longitude: number;
    populationServed: number;
    estimatedNeedPeople: number;
    mealRequirement: string;
    connectivityStatus: 'Low' | 'None';
    contactPerson: string;
    preferredDietary: 'VEG' | 'JAIN';
    notes: string;
    mappedBy: string;
}

export interface SeedDemandHeatmap {
    id: string;
    areaName: string;
    latitude: number;
    longitude: number;
    demandLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
    activeRequests: number;
    peopleCount: number;
    emergencyRequests: number;
}

// Demo Locations Centered around Delhi NCR & Regional Hubs
export const SEED_DONATIONS: SeedDonation[] = [
    {
        id: 'don_101',
        donorName: 'Royal Grand Banquet Hall',
        donorType: 'Wedding',
        foodName: 'Wedding Feast Buffet (Paneer Butter Masala, Dal Makhani, Pulao, Naan, Gulab Jamun)',
        category: 'Cooked Full Meals',
        quantity: '120 Servings',
        servingsCount: 120,
        dietary: 'VEG',
        usableRemainingHours: 1.5, // 🚨 EMERGENCY MODE!
        isEmergency: true,
        pickupAddress: 'Sector 62, Noida, UP',
        latitude: 28.627,
        longitude: 77.372,
        packagingCondition: 'Stainless steel hot containers ready for pickup',
        notes: 'High quality fresh food from evening wedding reception.',
        createdAt: new Date(Date.now() - 30 * 60000).toISOString()
    },
    {
        id: 'don_102',
        donorName: 'Shri Ram Mandir Bhandara Samiti',
        donorType: 'Bhandara',
        foodName: 'Puri Sabzi & Suji Halwa Prasad',
        category: 'Fresh Prasad Meals',
        quantity: '80 Servings',
        servingsCount: 80,
        dietary: 'VEG',
        usableRemainingHours: 4,
        isEmergency: false,
        pickupAddress: 'Chandni Chowk, Old Delhi',
        latitude: 28.656,
        longitude: 77.23,
        packagingCondition: 'Packed in eco-friendly paper boxes',
        notes: 'Pure sattvic preparation.',
        createdAt: new Date(Date.now() - 90 * 60000).toISOString()
    },
    {
        id: 'don_103',
        donorName: 'Jain Bhojanalaya & Catering',
        donorType: 'Restaurant',
        foodName: 'Pure Jain Dal Fry, Roti & Vegetable Khichdi',
        category: 'Cooked Meals',
        quantity: '40 Servings',
        servingsCount: 40,
        dietary: 'JAIN',
        usableRemainingHours: 3.5,
        isEmergency: false,
        pickupAddress: 'Karol Bagh, New Delhi',
        latitude: 28.652,
        longitude: 77.19,
        packagingCondition: 'Sealed foil meal packets',
        notes: 'Strictly No Onion, No Garlic, No Root Vegetables.',
        createdAt: new Date(Date.now() - 60 * 60000).toISOString()
    },
    {
        id: 'don_104',
        donorName: 'Haldiram Surplus Counter',
        donorType: 'Restaurant',
        foodName: 'Packed Thali Meals & Packed Snacks',
        category: 'Packed Meals',
        quantity: '35 Packets',
        servingsCount: 35,
        dietary: 'VEG',
        usableRemainingHours: 6,
        isEmergency: false,
        pickupAddress: 'Connaught Place, New Delhi',
        latitude: 28.632,
        longitude: 77.219,
        packagingCondition: 'Factory sealed boxes',
        notes: 'Surplus lunch stock.',
        createdAt: new Date(Date.now() - 120 * 60000).toISOString()
    },
    {
        id: 'don_105',
        donorName: 'Hyatt Regency Kitchens',
        donorType: 'Hotel',
        foodName: 'Continental & Indian Dinner Surplus',
        category: 'Buffet Meals',
        quantity: '60 Servings',
        servingsCount: 60,
        dietary: 'NON_VEG',
        usableRemainingHours: 2.0, // 🚨 Emergency
        isEmergency: true,
        pickupAddress: 'Bhikaji Cama Place, New Delhi',
        latitude: 28.568,
        longitude: 77.188,
        packagingCondition: 'Insulated thermocol containers',
        notes: 'Includes chicken curry, paneer gravy, and fresh rice.',
        createdAt: new Date(Date.now() - 15 * 60000).toISOString()
    }
];

export const SEED_REQUESTS: SeedRequest[] = [
    {
        id: 'req_201',
        beneficiaryName: 'Aasha Shelter for Children & Women',
        beneficiaryType: 'Shelter',
        peopleCount: 45,
        dietary: 'VEG',
        noOnionGarlic: false,
        urgency: 'URGENT',
        locationAddress: 'Mayur Vihar Phase 1, Delhi',
        latitude: 28.608,
        longitude: 77.295,
        priorityGroup: 'Children & Mothers',
        notes: 'Urgent requirement for dinner meals for 45 children.',
        contactPhone: '+91 98765 43210',
        createdAt: new Date(Date.now() - 40 * 60000).toISOString()
    },
    {
        id: 'req_202',
        beneficiaryName: 'Daily Wage Laborers Colony',
        beneficiaryType: 'Community',
        peopleCount: 75,
        dietary: 'VEG',
        noOnionGarlic: false,
        urgency: 'EMERGENCY',
        locationAddress: 'Labour Camp, Sector 63, Noida',
        latitude: 28.629,
        longitude: 77.382,
        priorityGroup: 'Families & Children',
        notes: 'Construction work paused due to rain, families need immediate meal support.',
        contactPhone: '+91 98112 34567',
        createdAt: new Date(Date.now() - 10 * 60000).toISOString()
    },
    {
        id: 'req_203',
        beneficiaryName: 'Shri Vardhman Jain Senior Care',
        beneficiaryType: 'Shelter',
        peopleCount: 25,
        dietary: 'JAIN',
        noOnionGarlic: true,
        urgency: 'NORMAL',
        locationAddress: 'Patparganj Industrial Area, Delhi',
        latitude: 28.631,
        longitude: 77.305,
        priorityGroup: 'Elderly Persons',
        notes: 'Jain elderly residence requires sattvic evening meals.',
        contactPhone: '+91 99900 11223',
        createdAt: new Date(Date.now() - 150 * 60000).toISOString()
    },
    {
        id: 'req_204',
        beneficiaryName: 'Ramesh (Migrant Worker Family)',
        beneficiaryType: 'Family',
        peopleCount: 6,
        dietary: 'VEG',
        urgency: 'NORMAL',
        locationAddress: 'Laxmi Nagar, Delhi',
        latitude: 28.63,
        longitude: 77.277,
        priorityGroup: 'Family with 4 children',
        notes: 'Requiring evening meal for family.',
        contactPhone: '+91 97111 88899',
        createdAt: new Date(Date.now() - 80 * 60000).toISOString()
    }
];

export const SEED_BHANDARAS: SeedBhandaraEvent[] = [
    {
        id: 'bhan_301',
        eventName: 'Maha Shivratri Mega Bhandara',
        organizer: 'Shiv Mandir Trust',
        eventType: 'Bhandara',
        address: 'Kalka Mandir Complex, Nehru Place, Delhi',
        latitude: 28.552,
        longitude: 77.258,
        eventDate: 'Today',
        timing: '12:00 PM - 8:00 PM',
        estimatedMeals: 2500,
        dietary: 'VEG',
        contactPhone: '+91 98100 55443',
        surplusExpected: true
    },
    {
        id: 'bhan_302',
        eventName: 'Gurudwara Bangla Sahib Daily Langar',
        organizer: 'Delhi Sikh Gurdwara Management Committee',
        eventType: 'Langar',
        address: 'Ashoka Road, Connaught Place, New Delhi',
        latitude: 28.626,
        longitude: 77.209,
        eventDate: 'Everyday 24/7',
        timing: '24 Hours Open',
        estimatedMeals: 15000,
        dietary: 'VEG',
        contactPhone: '+91 11 2371 2580',
        surplusExpected: true
    },
    {
        id: 'bhan_303',
        eventName: 'Shree Hanuman Garhi Community Feast',
        organizer: 'Varanasi Seva Sansthan',
        eventType: 'Community Feast',
        address: 'Assi Ghat, Varanasi, UP',
        latitude: 25.288,
        longitude: 82.999,
        eventDate: 'Today',
        timing: '6:00 PM - 10:00 PM',
        estimatedMeals: 800,
        dietary: 'VEG',
        contactPhone: '+91 94150 99887',
        surplusExpected: true
    }
];

export const SEED_COMMUNITY_KITCHENS: SeedCommunityKitchen[] = [
    {
        id: 'kitch_401',
        name: 'Akshaya Patra Central Redistribution Hub',
        organization: 'Akshaya Patra Foundation',
        address: 'Okhla Industrial Estate Phase 3, New Delhi',
        latitude: 28.541,
        longitude: 77.273,
        openingHours: '6:00 AM - 9:00 PM',
        capacityServings: 5000,
        currentAvailable: 450,
        dietary: 'VEG',
        contactPhone: '+91 11 4050 6000'
    },
    {
        id: 'kitch_402',
        name: 'Robin Hood Army Food Relief Kitchen',
        organization: 'Robin Hood Army Delhi',
        address: 'Lajpat Nagar 2, New Delhi',
        latitude: 28.569,
        longitude: 77.243,
        openingHours: '10:00 AM - 10:00 PM',
        capacityServings: 2000,
        currentAvailable: 280,
        dietary: 'VEG',
        contactPhone: '+91 98999 12345'
    },
    {
        id: 'kitch_403',
        name: 'ISKCON Annamrita Relief Kitchen',
        organization: 'ISKCON Food for Life',
        address: 'East of Kailash, New Delhi',
        latitude: 28.557,
        longitude: 77.253,
        openingHours: '7:00 AM - 8:30 PM',
        capacityServings: 3500,
        currentAvailable: 310,
        dietary: 'VEG',
        contactPhone: '+91 11 2623 5133'
    }
];

export const SEED_OFFLINE_AREAS: SeedOfflineArea[] = [
    {
        id: 'off_501',
        areaName: 'Yamuna Pushta Cluster Settlements',
        address: 'Near Shastri Park Metro Bridge, Delhi',
        latitude: 28.665,
        longitude: 77.254,
        populationServed: 350,
        estimatedNeedPeople: 120,
        mealRequirement: 'Daily Evening Meals (Puri/Roti & Sabzi)',
        connectivityStatus: 'Low',
        contactPerson: 'Pradhan Ramesh Chand',
        preferredDietary: 'VEG',
        notes: 'Intermittent 2G network signal. Paper slip log maintained by volunteer Sunil.',
        mappedBy: 'Volunteer Amit Kumar (NGO Partner)'
    },
    {
        id: 'off_502',
        areaName: 'Rithala Brick Kiln Migrant Community',
        address: 'Rithala Extension, Outer Delhi',
        latitude: 28.721,
        longitude: 77.108,
        populationServed: 220,
        estimatedNeedPeople: 85,
        mealRequirement: 'Hot Cooked Meals & Child Nutrition Packets',
        connectivityStatus: 'None',
        contactPerson: 'Sita Devi (Community Leader)',
        preferredDietary: 'VEG',
        notes: 'Zero mobile connectivity inside brick kiln zone. SMS offline sync used.',
        mappedBy: 'Pratham NGO Relief Team'
    }
];

export const SEED_DEMAND_HEATMAP: SeedDemandHeatmap[] = [
    {
        id: 'heat_601',
        areaName: 'Sector 63 Labour Colony & Industrial Belt',
        latitude: 28.629,
        longitude: 77.382,
        demandLevel: 'CRITICAL',
        activeRequests: 8,
        peopleCount: 195,
        emergencyRequests: 3
    },
    {
        id: 'heat_602',
        areaName: 'Yamuna Pushta & Old Delhi Station Environs',
        latitude: 28.662,
        longitude: 77.245,
        demandLevel: 'HIGH',
        activeRequests: 5,
        peopleCount: 130,
        emergencyRequests: 1
    },
    {
        id: 'heat_603',
        areaName: 'Mayur Vihar Shelter Zone',
        latitude: 28.608,
        longitude: 77.295,
        demandLevel: 'MODERATE',
        activeRequests: 3,
        peopleCount: 65,
        emergencyRequests: 0
    },
    {
        id: 'heat_604',
        areaName: 'Karol Bagh Market Workers Hub',
        latitude: 28.652,
        longitude: 77.19,
        demandLevel: 'LOW',
        activeRequests: 1,
        peopleCount: 20,
        emergencyRequests: 0
    }
];
