"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Radio, ShieldCheck, Image as ImageIcon, Trash2, Users, Star, Crown, Edit, X, Calendar, Clock, MapPin, HeartHandshake } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const translations = {
    en: {
        // Login
        adminAccess: "Admin Access",
        loginPrompt: "Please enter the admin password to continue.",
        enterPassword: "Enter Admin Password",
        login: "Login",
        // Header
        adminControl: "Mandal Admin Control",
        manageFeatures: "Manage website features",
        backToSite: "Back to Site",
        // Live Stream
        liveStreamTitle: "Live Stream Visibility",
        liveStreamDesc: "Toggle this to show or hide the \"Live Stream\" button in the bottom left corner of the main website. Turn this on only when a live event is actively happening.",
        currentlyLive: "Currently Live",
        hidden: "Hidden",
        liveNote: "Note:",
        liveNoteDesc: "This live status uses a local file to temporarily save state. In a production environment (like Vercel), this may reset to default on server restart. For permanent storage, connecting a database is recommended.",
        // Tabs
        coreCommittee: "Core Committee",
        subCommittees: "Sub-Committees",
        photoGallery: "Photo Gallery",
        upcomingEvents: "Upcoming Events",
        // Gallery
        uploadToGallery: "Upload to Photo Gallery",
        galleryDesc: "Add a new memory to the gallery. The newest photos will automatically appear at the top.",
        imageFile: "Image File",
        year: "Year",
        captionEn: "Caption (English)",
        captionMr: "Caption (Marathi)",
        uploading: "Uploading...",
        uploadPhoto: "Upload Photo",
        uploadedPhotos: "Uploaded Photos",
        showHistory: "Show History",
        hideHistory: "Hide History",
        image: "Image",
        caption: "Caption (English / Marathi)",
        action: "Action",
        noPhotos: "No photos uploaded yet.",
        showMore: "Show More Photos",
        showLess: "Show Less",
        // Events
        manageEvents: "Manage Upcoming Events",
        eventsDesc: "Add, edit, or remove the events displayed on the homepage.",
        addNewEvent: "Add New Event",
        editEvent: "Edit Event",
        cancelEdit: "Cancel Edit",
        eventTitleEn: "Event Title (English)",
        eventTitleMr: "Event Title (Marathi)",
        eventDate: "Event Pick Date",
        dateNote: "Date displays will be automatically localized.",
        eventTime: "Event Pick Time (Optional)",
        locationEn: "Location (English)",
        locationMr: "Location (Marathi)",
        eventType: "Event Type/Category",
        descEn: "Description (English)",
        descMr: "Description (Marathi)",
        eventPoster: "Event Poster (Optional)",
        posterNote: "Upload a poster or flyer image for this event.",
        adding: "Adding...",
        saving: "Saving...",
        addEvent: "Add Event",
        updateEvent: "Update Event",
        currentEvents: "Current Registered Events",
        edit: "Edit",
        delete: "Delete",
        noEvents: "No upcoming events active. Add some events using the form above.",
        // Sub-Committee
        subCommMgmt: "Sub-Committee Management",
        subCommDesc: "Add or remove members from various sub-committees. Changes will be instantly visible on the public Committee page.",
        createNewSubComm: "Create New Sub-Committee",
        commNameEn: "Committee Name (English)",
        commNameMr: "Committee Name (Marathi)",
        creating: "Creating...",
        createComm: "Create Committee",
        addNewMember: "Add New Member",
        selectSubComm: "Select Sub-Committee",
        memberNameEn: "Member Name (English)",
        memberNameMr: "Member Name (Marathi)",
        addMember: "Add Member",
        currentMembers: "Current Members",
        members: "Members",
        noMembers: "No members added yet.",
        loadingSubComm: "Loading sub-committees...",
        // Core Committee
        coreCommMgmt: "Core Committee Management",
        coreCommDesc: "Update the top leadership and core members dynamically.",
        addCoreMember: "Add General Core Member",
        selectGroup: "Select Group",
        imgUrl: "Image URL (Optional for Leaders)",
        roleEn: "Role (English)",
        roleMr: "Role (Marathi)",
        coreLeaders: "Core Leaders",
        advisoryBoard: "Advisory Board",
        workingMembers: "Working Members",
        // Past Committee
        pastCommMgmt: "Past Committee Management",
        pastCommDesc: "Update the legacy members of the Mandal.",
        addPastMember: "Add Past Member",
        pastPresident: "Past President",
        pastVicePresident: "Past Vice President",
        pastSecretary: "Past Secretary",
        pastTreasurer: "Past Treasurer",
        pastMembersList: "Past Members",
        // Inventory
        inventoryMgmt: "Social Work Inventory",
        inventoryDesc: "Manage available medical equipment and stock logic.",
        equipmentTitleEn: "Equipment Name (English)",
        equipmentTitleMr: "Equipment Name (Marathi)",
        equipDescEn: "Description (English)",
        equipDescMr: "Description (Marathi)",
        totalUnits: "Total Units",
        availableUnits: "Available Units",
        equipmentType: "Equipment ID Tag",
        equipPhoto: "Equipment Photo",
        currentEquip: "Current Equipment Inventory",
        addEquipment: "Add Equipment",
        updateEquipment: "Update Equipment",
        noEquipment: "No equipment added yet.",
        // Edit Modal
        editLeader: "Edit Leader",
        editMember: "Edit Member",
        nameEn: "Name (English)",
        nameMr: "Name (Marathi)",
        imageUrl: "Image URL",
        cancel: "Cancel",
        savingChanges: "Saving...",
        saveChanges: "Save Changes",
    },
    mr: {
        // Login
        adminAccess: "प्रशासक प्रवेश",
        loginPrompt: "कृपया सुरू ठेवण्यासाठी प्रशासक पासवर्ड प्रविष्ट करा.",
        enterPassword: "प्रशासक पासवर्ड प्रविष्ट करा",
        login: "लॉगिन",
        // Header
        adminControl: "मंडळ प्रशासक नियंत्रण",
        manageFeatures: "वेबसाइट वैशिष्ट्ये व्यवस्थापित करा",
        backToSite: "मुख्य साइटवर जा",
        // Live Stream
        liveStreamTitle: "लाइव्ह स्ट्रीम दृश्यता",
        liveStreamDesc: "मुख्य वेबसाइटवर \"लाइव्ह स्ट्रीम\" बटण दाखवण्यासाठी किंवा लपवण्यासाठी हे टॉगल करा. कार्यक्रम सुरू असताना हे चालू करा.",
        currentlyLive: "सध्या लाइव्ह",
        hidden: "लपवलेले",
        liveNote: "टीप:",
        liveNoteDesc: "ही लाइव्ह स्थिती तात्पुरती फाइलमध्ये साठवली जाते. उत्पादन वातावरणात (जसे Vercel), सर्व्हर रीस्टार्ट केल्यावर हे डिफॉल्टवर येऊ शकते.",
        // Tabs
        coreCommittee: "कार्यकारिणी",
        subCommittees: "उपसमित्या",
        photoGallery: "फोटो गॅलरी",
        upcomingEvents: "आगामी कार्यक्रम",
        // Gallery
        uploadToGallery: "फोटो गॅलरीमध्ये अपलोड करा",
        galleryDesc: "गॅलरीमध्ये नवीन आठवण जोडा. नवीनतम फोटो आपोआप वर दिसतील.",
        imageFile: "इमेज फाइल",
        year: "वर्ष",
        captionEn: "कॅप्शन (इंग्रजी)",
        captionMr: "कॅप्शन (मराठी)",
        uploading: "अपलोड होत आहे...",
        uploadPhoto: "फोटो अपलोड करा",
        uploadedPhotos: "अपलोड केलेले फोटो",
        showHistory: "इतिहास दाखवा",
        hideHistory: "इतिहास लपवा",
        image: "इमेज",
        caption: "कॅप्शन (इंग्रजी / मराठी)",
        action: "क्रिया",
        noPhotos: "अद्याप कोणतेही फोटो अपलोड केलेले नाहीत.",
        showMore: "अजून फोटो दाखवा",
        showLess: "कमी दाखवा",
        // Events
        manageEvents: "आगामी कार्यक्रम व्यवस्थापित करा",
        eventsDesc: "मुख्यपृष्ठावर दाखवले जाणारे कार्यक्रम जोडा, संपादित करा किंवा काढा.",
        addNewEvent: "नवीन कार्यक्रम जोडा",
        editEvent: "कार्यक्रम संपादित करा",
        cancelEdit: "संपादन रद्द करा",
        eventTitleEn: "कार्यक्रम शीर्षक (इंग्रजी)",
        eventTitleMr: "कार्यक्रम शीर्षक (मराठी)",
        eventDate: "कार्यक्रम तारीख निवडा",
        dateNote: "तारीख प्रदर्शन आपोआप स्थानिकीकृत होईल.",
        eventTime: "कार्यक्रम वेळ (ऐच्छिक)",
        locationEn: "ठिकाण (इंग्रजी)",
        locationMr: "ठिकाण (मराठी)",
        eventType: "कार्यक्रम प्रकार/श्रेणी",
        descEn: "वर्णन (इंग्रजी)",
        descMr: "वर्णन (मराठी)",
        eventPoster: "कार्यक्रम पोस्टर (ऐच्छिक)",
        posterNote: "या कार्यक्रमासाठी पोस्टर अपलोड करा.",
        adding: "जोडत आहे...",
        saving: "जतन होत आहे...",
        addEvent: "कार्यक्रम जोडा",
        updateEvent: "कार्यक्रम अपडेट करा",
        currentEvents: "सध्याचे नोंदणीकृत कार्यक्रम",
        edit: "संपादित करा",
        delete: "हटवा",
        noEvents: "सध्या कोणतेही कार्यक्रम नाहीत. वरील फॉर्म वापरून कार्यक्रम जोडा.",
        // Sub-Committee
        subCommMgmt: "उपसमिती व्यवस्थापन",
        subCommDesc: "विविध उपसमित्यांमधून सदस्य जोडा किंवा काढा. बदल समिती पृष्ठावर लगेच दिसतील.",
        createNewSubComm: "नवीन उपसमिती तयार करा",
        commNameEn: "समिती नाव (इंग्रजी)",
        commNameMr: "समिती नाव (मराठी)",
        creating: "तयार होत आहे...",
        createComm: "समिती तयार करा",
        addNewMember: "नवीन सदस्य जोडा",
        selectSubComm: "उपसमिती निवडा",
        memberNameEn: "सदस्य नाव (इंग्रजी)",
        memberNameMr: "सदस्य नाव (मराठी)",
        addMember: "सदस्य जोडा",
        currentMembers: "सध्याचे सदस्य",
        members: "सदस्य",
        noMembers: "अद्याप सदस्य जोडलेले नाहीत.",
        loadingSubComm: "उपसमित्या लोड होत आहेत...",
        // Core Committee
        coreCommMgmt: "कार्यकारिणी व्यवस्थापन",
        coreCommDesc: "शीर्ष नेतृत्व आणि मुख्य सदस्य गतिशीलपणे अपडेट करा.",
        addCoreMember: "सामान्य कार्यकारिणी सदस्य जोडा",
        selectGroup: "गट निवडा",
        imgUrl: "इमेज URL (नेत्यांसाठी ऐच्छिक)",
        roleEn: "भूमिका (इंग्रजी)",
        roleMr: "भूमिका (मराठी)",
        coreLeaders: "मुख्य नेते",
        advisoryBoard: "सल्लागार मंडळ",
        workingMembers: "कार्यकारी सदस्य",
        // Past Committee
        pastCommMgmt: "माजी समिती व्यवस्थापन",
        pastCommDesc: "मंडळाच्या माजी सदस्यांची माहिती अपडेट करा.",
        addPastMember: "माजी सदस्य जोडा",
        pastPresident: "माजी अध्यक्ष",
        pastVicePresident: "माजी उपाध्यक्ष",
        pastSecretary: "माजी सचिव",
        pastTreasurer: "माजी खजिनदार",
        pastMembersList: "माजी सदस्य",
        // Inventory
        inventoryMgmt: "सामाजिक उपक्रम इन्व्हेंटरी",
        inventoryDesc: "उपलब्ध वैद्यकीय उपकरणे व्यवस्थापित करा.",
        equipmentTitleEn: "उपकरणाचे नाव (इंग्रजी)",
        equipmentTitleMr: "उपकरणाचे नाव (मराठी)",
        equipDescEn: "वर्णन (इंग्रजी)",
        equipDescMr: "वर्णन (मराठी)",
        totalUnits: "एकूण साधने",
        availableUnits: "उपलब्ध साधने",
        equipmentType: "उपकरण ID टॅग",
        equipPhoto: "उपकरणाचा फोटो",
        currentEquip: "सध्याची उपकरणे इन्व्हेंटरी",
        addEquipment: "उपकरण जोडा",
        updateEquipment: "उपकरण अपडेट करा",
        noEquipment: "अद्याप कोणतीही उपकरणे जोडलेली नाहीत.",
        // Edit Modal
        editLeader: "नेता संपादित करा",
        editMember: "सदस्य संपादित करा",
        nameEn: "नाव (इंग्रजी)",
        nameMr: "नाव (मराठी)",
        imageUrl: "इमेज URL",
        cancel: "रद्द करा",
        savingChanges: "जतन होत आहे...",
        saveChanges: "बदल जतन करा",
    }
};

export default function AdminPage() {
    const { lang, setLang } = useLanguage();
    const t = (key) => translations[lang]?.[key] || translations.en[key] || key;
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
    const getImageUrl = (path) => path?.startsWith('/uploads') ? `${API_URL}${path}` : path;

    const [isLive, setIsLive] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [activeTab, setActiveTab] = useState("core-committee");

    // Gallery states
    const [uploadFile, setUploadFile] = useState(null);
    const [uploadYear, setUploadYear] = useState(new Date().getFullYear().toString());
    const [uploadAltEn, setUploadAltEn] = useState("");
    const [uploadAltMr, setUploadAltMr] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState("");
    const [galleryItems, setGalleryItems] = useState([]);
    const [isDeleting, setIsDeleting] = useState(false);
    const [visibleCount, setVisibleCount] = useState(5);
    const [showHistory, setShowHistory] = useState(false);
    const fileInputRef = useRef(null);

    // Sub-Committee states
    const [subCommittees, setSubCommittees] = useState([]);
    const [selectedSubCommittee, setSelectedSubCommittee] = useState("media");
    const [memberNameEn, setMemberNameEn] = useState("");
    const [memberNameMr, setMemberNameMr] = useState("");
    const [memberRole, setMemberRole] = useState("");
    const [isAddingMember, setIsAddingMember] = useState(false);
    const [addMemberStatus, setAddMemberStatus] = useState("");
    const [isDeletingMember, setIsDeletingMember] = useState(false);

    // Sub-Committee Edit modal states
    const [isSubEditOpen, setIsSubEditOpen] = useState(false);
    const [subEditCommitteeId, setSubEditCommitteeId] = useState("");
    const [subEditMemberId, setSubEditMemberId] = useState("");
    const [subEditNameEn, setSubEditNameEn] = useState("");
    const [subEditNameMr, setSubEditNameMr] = useState("");
    const [subEditRole, setSubEditRole] = useState("");
    const [isSubmittingSubEdit, setIsSubmittingSubEdit] = useState(false);

    // Create New Sub-Committee states
    const [newSubTitleEn, setNewSubTitleEn] = useState("");
    const [newSubTitleMr, setNewSubTitleMr] = useState("");
    const [isAddingSub, setIsAddingSub] = useState(false);
    const [addSubStatus, setAddSubStatus] = useState("");

    // Core Committee states
    const [coreCommittee, setCoreCommittee] = useState(null);

    const [coreListTarget, setCoreListTarget] = useState("members");
    const [coreListNameEn, setCoreListNameEn] = useState("");
    const [coreListNameMr, setCoreListNameMr] = useState("");
    const [coreListRoleEn, setCoreListRoleEn] = useState("");
    const [coreListRoleMr, setCoreListRoleMr] = useState("");
    const [coreListImg, setCoreListImg] = useState("");
    const [coreListImgFile, setCoreListImgFile] = useState(null);
    const [coreListImgMode, setCoreListImgMode] = useState("upload"); // 'upload' or 'url'
    const coreListImgRef = useRef(null);
    const [isAddingCoreMember, setIsAddingCoreMember] = useState(false);
    const [addCoreMemberStatus, setAddCoreMemberStatus] = useState("");

    // Editing Modal States
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingMemberGroup, setEditingMemberGroup] = useState("");
    const [editingMemberId, setEditingMemberId] = useState("");
    const [editNameEn, setEditNameEn] = useState("");
    const [editNameMr, setEditNameMr] = useState("");
    const [editRoleEn, setEditRoleEn] = useState("");
    const [editRoleMr, setEditRoleMr] = useState("");
    const [editImg, setEditImg] = useState("");
    const [editImgFile, setEditImgFile] = useState(null);
    const [editImgMode, setEditImgMode] = useState("url"); // 'upload' or 'url'
    const editImgRef = useRef(null);
    const [isSubmittingEdit, setIsSubmittingEdit] = useState(false);

    // Events Management States
    const [events, setEvents] = useState([]);
    const [editingEventId, setEditingEventId] = useState(null);
    const [eventTitleEn, setEventTitleEn] = useState("");
    const [eventTitleMr, setEventTitleMr] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [eventTime, setEventTime] = useState("");
    const [eventLocEn, setEventLocEn] = useState("");
    const [eventLocMr, setEventLocMr] = useState("");
    const [eventDescEn, setEventDescEn] = useState("");
    const [eventDescMr, setEventDescMr] = useState("");
    const [eventType, setEventType] = useState("general");
    const [eventPoster, setEventPoster] = useState(null);
    const eventPosterRef = useRef(null);
    const [isSubmittingEvent, setIsSubmittingEvent] = useState(false);
    const [eventStatusMsg, setEventStatusMsg] = useState("");
    const [isDeletingEvent, setIsDeletingEvent] = useState(false);

    // Inventory States
    const [inventoryItems, setInventoryItems] = useState([]);
    const [editingInvId, setEditingInvId] = useState(null);
    const [invType, setInvType] = useState("wheelchair");
    const [invTitleEn, setInvTitleEn] = useState("");
    const [invTitleMr, setInvTitleMr] = useState("");
    const [invDescEn, setInvDescEn] = useState("");
    const [invDescMr, setInvDescMr] = useState("");
    const [invTotalUnits, setInvTotalUnits] = useState(0);
    const [invAvailableUnits, setInvAvailableUnits] = useState(0);
    const [invPhoto, setInvPhoto] = useState(null);
    const invPhotoRef = useRef(null);
    const [isSubmittingInv, setIsSubmittingInv] = useState(false);
    const [invStatusMsg, setInvStatusMsg] = useState("");
    const [isDeletingInv, setIsDeletingInv] = useState(false);

    // Fetch initial status
    useEffect(() => {
        if (!isAuthenticated) return;
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

        fetch(`${API_URL}/api/live-status`)
            .then(res => res.json())
            .then(data => {
                setIsLive(data.isLive);
                setIsLoading(false);
            })
            .catch(() => setIsLoading(false));

        fetchGallery();
        fetchSubCommittees();
        fetchCoreCommittee();
        fetchEvents();
        fetchInventory();
    }, [isAuthenticated]);

    const fetchGallery = async () => {
        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
            const res = await fetch(`${API_URL}/api/gallery`, { cache: "no-store", next: { revalidate: 0 } });
            const data = await res.json();
            if (Array.isArray(data)) {
                setGalleryItems(data);
            }
        } catch (err) {
            console.error("Failed to fetch gallery items", err);
        }
    };

    const fetchSubCommittees = async () => {
        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
            const res = await fetch(`${API_URL}/api/sub-committee`, { cache: "no-store", next: { revalidate: 0 } });
            const data = await res.json();
            if (Array.isArray(data)) {
                setSubCommittees(data);
                if (data.length > 0 && !data.some(sub => sub._id === selectedSubCommittee)) {
                    setSelectedSubCommittee(data[0]._id); // Set default if current selection is invalid
                } else if (data.length === 0) {
                    setSelectedSubCommittee("");
                }
            }
        } catch (err) {
            console.error("Failed to fetch sub-committees", err);
        }
    };

    const fetchCoreCommittee = async () => {
        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
            const res = await fetch(`${API_URL}/api/core-committee`, { cache: "no-store", next: { revalidate: 0 } });
            const data = await res.json();
            if (data && data.president) {
                setCoreCommittee(data);
            }
        } catch (err) {
            console.error("Failed to fetch core committee", err);
        }
    };

    const fetchEvents = async () => {
        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
            const res = await fetch(`${API_URL}/api/events`, { cache: "no-store", next: { revalidate: 0 } });
            const data = await res.json();
            if (Array.isArray(data)) {
                setEvents(data);
            }
        } catch (err) {
            console.error("Failed to fetch events", err);
        }
    };

    const fetchInventory = async () => {
        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
            const res = await fetch(`${API_URL}/api/inventory`, { cache: "no-store", next: { revalidate: 0 } });
            const data = await res.json();
            if (Array.isArray(data)) {
                setInventoryItems(data);
            }
        } catch (err) {
            console.error("Failed to fetch inventory", err);
        }
    };

    const handleAddInventory = async (e) => {
        e.preventDefault();
        if (!invTitleEn || !invTitleMr) return;
        setIsSubmittingInv(true);
        setInvStatusMsg("");

        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
            const formData = new FormData();
            if (editingInvId) formData.append('id', editingInvId);
            formData.append('itemType', invType);
            formData.append('titleEn', invTitleEn);
            formData.append('titleMr', invTitleMr);
            formData.append('descriptionEn', invDescEn);
            formData.append('descriptionMr', invDescMr);
            formData.append('totalUnits', invTotalUnits);
            formData.append('availableUnits', invAvailableUnits);
            if (invPhoto) formData.append('image', invPhoto);

            const res = await fetch(`${API_URL}/api/inventory`, {
                method: "POST",
                body: formData
            });

            const data = await res.json();
            if (data.success) {
                setInvStatusMsg(editingInvId ? "Equipment updated successfully!" : "Equipment added successfully!");
                resetInvForm();
                fetchInventory();
            } else {
                setInvStatusMsg("Error: " + (data.error || "Failed to save equipment"));
            }
            setTimeout(() => setInvStatusMsg(""), 3000);
        } catch (err) {
            setInvStatusMsg("Failed to submit equipment");
        } finally {
            setIsSubmittingInv(false);
        }
    };

    const resetInvForm = () => {
        setEditingInvId(null);
        setInvType("wheelchair");
        setInvTitleEn(""); setInvTitleMr("");
        setInvDescEn(""); setInvDescMr("");
        setInvTotalUnits(0); setInvAvailableUnits(0);
        setInvPhoto(null);
        if (invPhotoRef.current) invPhotoRef.current.value = "";
    };

    const handleEditInvClick = (inv) => {
        setEditingInvId(inv._id);
        setInvType(inv.itemType || "wheelchair");
        setInvTitleEn(inv.titleEn);
        setInvTitleMr(inv.titleMr);
        setInvDescEn(inv.descriptionEn || "");
        setInvDescMr(inv.descriptionMr || "");
        setInvTotalUnits(inv.totalUnits || 0);
        setInvAvailableUnits(inv.availableUnits || 0);
        setInvPhoto(null);
        if (invPhotoRef.current) invPhotoRef.current.value = "";
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDeleteInv = async (id) => {
        if (!confirm("Are you sure you want to delete this equipment?")) return;
        setIsDeletingInv(true);
        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
            const res = await fetch(`${API_URL}/api/inventory/${id}`, { method: 'DELETE' });
            const data = await res.json();
            if (data.success) {
                fetchInventory();
            } else {
                alert("Failed to delete equipment: " + data.error);
            }
        } catch (error) {
            alert("Delete failed due to an error.");
        }
        setIsDeletingInv(false);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        // Simple hardcoded password for basic protection (user can change this later or implement real auth)
        if (password === "admin123") {
            setIsAuthenticated(true);
            setError("");
        } else {
            setError("Incorrect password");
        }
    };

    const toggleLiveStatus = async () => {
        setIsLoading(true);
        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
            const newStatus = !isLive;
            const res = await fetch(`${API_URL}/api/live-status`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isLive: newStatus })
            });
            const data = await res.json();
            if (data.success) {
                setIsLive(data.isLive);
            }
        } catch (error) {
            console.error("Failed to update status", error);
        }
        setIsLoading(false);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!uploadFile) return;
        setIsUploading(true);
        setUploadStatus("");

        const formData = new FormData();
        formData.append("image", uploadFile);
        formData.append("year", uploadYear);
        formData.append("altEn", uploadAltEn);
        formData.append("altMr", uploadAltMr);

        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
            const res = await fetch(`${API_URL}/api/gallery`, {
                method: "POST",
                body: formData
            });
            const data = await res.json();
            if (data.success) {
                setUploadStatus("Photo uploaded successfully! It is now live in the gallery.");
                setUploadFile(null);
                setUploadAltEn("");
                setUploadAltMr("");
                if (fileInputRef.current) fileInputRef.current.value = "";
                fetchGallery(); // Refresh the list!
            } else {
                setUploadStatus("Error: " + (data.error || "Upload failed"));
            }
        } catch (err) {
            setUploadStatus("Failed to submit");
        }
        setIsUploading(false);
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this photo from the gallery?")) return;

        setIsDeleting(true);
        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
            const res = await fetch(`${API_URL}/api/gallery?id=${id}`, { method: 'DELETE' });
            const data = await res.json();
            if (data.success) {
                fetchGallery(); // refresh
            } else {
                alert("Failed to delete: " + data.error);
            }
        } catch (error) {
            console.error("Delete failed", error);
            alert("Delete failed due to an error.");
        }
        setIsDeleting(false);
    };

    const handleAddMember = async (e) => {
        e.preventDefault();
        if (!memberNameEn || !memberNameMr) return;
        setIsAddingMember(true);
        setAddMemberStatus("");

        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
            const payload = {
                subCommitteeId: selectedSubCommittee,
                nameEn: memberNameEn,
                nameMr: memberNameMr
            };
            if (memberRole === 'head') {
                payload.roleEn = 'Head';
                payload.roleMr = 'प्रमुख';
            } else if (memberRole === 'jt-head') {
                payload.roleEn = 'Jt. Head';
                payload.roleMr = 'सह-प्रमुख';
            }
            const res = await fetch(`${API_URL}/api/sub-committee`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            const data = await res.json();
            if (data.success) {
                setAddMemberStatus("Member added successfully!");
                setMemberNameEn("");
                setMemberNameMr("");
                setMemberRole("");
                fetchSubCommittees(); // Refresh the list
            } else {
                setAddMemberStatus("Error: " + (data.error || "Failed to add member"));
            }
            setTimeout(() => setAddMemberStatus(""), 3000);
        } catch (err) {
            setAddMemberStatus("Failed to add member");
        } finally {
            setIsAddingMember(false);
        }
    };

    const openSubEdit = (committeeId, member) => {
        setSubEditCommitteeId(committeeId);
        setSubEditMemberId(member.id);
        setSubEditNameEn(member.name.en);
        setSubEditNameMr(member.name.mr);
        const roleEn = (member.role?.en || '').toLowerCase();
        if (roleEn === 'head') setSubEditRole('head');
        else if (roleEn.includes('jt') || roleEn.includes('joint')) setSubEditRole('jt-head');
        else setSubEditRole('');
        setIsSubEditOpen(true);
    };

    const handleSubEditSubmit = async (e) => {
        e.preventDefault();
        if (!subEditNameEn || !subEditNameMr) return;
        setIsSubmittingSubEdit(true);
        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
            const payload = {
                subCommitteeId: subEditCommitteeId,
                memberId: subEditMemberId,
                nameEn: subEditNameEn,
                nameMr: subEditNameMr
            };
            if (subEditRole === 'head') {
                payload.roleEn = 'Head';
                payload.roleMr = 'प्रमुख';
            } else if (subEditRole === 'jt-head') {
                payload.roleEn = 'Jt. Head';
                payload.roleMr = 'सह-प्रमुख';
            } else {
                payload.roleEn = '';
                payload.roleMr = '';
            }
            const res = await fetch(`${API_URL}/api/sub-committee`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            const data = await res.json();
            if (data.success) {
                fetchSubCommittees();
                setIsSubEditOpen(false);
            } else {
                alert("Failed: " + data.error);
            }
        } catch (error) {
            alert("Edit failed");
        }
        setIsSubmittingSubEdit(false);
    };

    const handleAddSubCommittee = async (e) => {
        e.preventDefault();
        setIsAddingSub(true);
        setAddSubStatus("Creating sub-committee...");

        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
            const res = await fetch(`${API_URL}/api/sub-committee`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    action: "add-sub-committee",
                    titleEn: newSubTitleEn,
                    titleMr: newSubTitleMr
                }),
            });

            const data = await res.json();
            if (data.success) {
                setAddSubStatus("Sub-committee created successfully!");
                setSubCommittees([...subCommittees, data.committee]);
                setNewSubTitleEn("");
                setNewSubTitleMr("");
            } else {
                setAddSubStatus(`Error: ${data.error}`);
            }
            setTimeout(() => setAddSubStatus(""), 3000);
        } catch (err) {
            setAddSubStatus("Failed to create sub-committee");
        } finally {
            setIsAddingSub(false);
        }
    };

    const handleDeleteMember = async (subCommitteeId, memberId) => {
        if (!confirm("Are you sure you want to remove this member?")) return;

        setIsDeletingMember(true);
        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
            const res = await fetch(`${API_URL}/api/sub-committee?subCommitteeId=${subCommitteeId}&memberId=${memberId}`, { method: 'DELETE' });
            const data = await res.json();
            if (data.success) {
                fetchSubCommittees(); // refresh
            } else {
                alert("Failed to delete member: " + data.error);
            }
        } catch (error) {
            console.error("Delete failed", error);
            alert("Delete failed due to an error.");
        }
        setIsDeletingMember(false);
    };

    const handleDeleteSubCommittee = async (subCommitteeId) => {
        if (!confirm("Are you sure you want to delete this entire sub-committee and all its members?")) return;
        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
            const res = await fetch(`${API_URL}/api/sub-committee?subCommitteeId=${subCommitteeId}`, { method: 'DELETE' });
            const data = await res.json();
            if (data.success) {
                fetchSubCommittees();
            } else {
                alert("Failed to delete: " + data.error);
            }
        } catch (error) {
            alert("Delete failed");
        }
    };

    const handleAddCoreMember = async (e) => {
        e.preventDefault();
        if (!coreListNameEn || !coreListNameMr) return;
        setIsAddingCoreMember(true);
        setAddCoreMemberStatus("");

        try {
            const payloadData = { nameEn: coreListNameEn, nameMr: coreListNameMr };
            if (["coreLeaders", "pastPresident", "pastVicePresident", "pastSecretary", "pastTreasurer"].includes(coreListTarget)) {
                payloadData.roleEn = coreListRoleEn;
                payloadData.roleMr = coreListRoleMr;
            }
            // If URL mode, include the URL
            if (coreListImgMode === 'url' && coreListImg) {
                payloadData.img = coreListImg;
            }

            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
            const formData = new FormData();
            formData.append('group', coreListTarget);
            formData.append('action', 'add-member');
            formData.append('data', JSON.stringify(payloadData));
            if (coreListImgMode === 'upload' && coreListImgFile) {
                formData.append('memberImg', coreListImgFile);
            }

            const res = await fetch(`${API_URL}/api/core-committee`, {
                method: "POST",
                body: formData
            });
            const data = await res.json();
            if (data.success) {
                setAddCoreMemberStatus("Member added successfully!");
                setCoreListNameEn("");
                setCoreListNameMr("");
                setCoreListRoleEn("");
                setCoreListRoleMr("");
                setCoreListImg("");
                setCoreListImgFile(null);
                if (coreListImgRef.current) coreListImgRef.current.value = '';
                fetchCoreCommittee();
            } else {
                setAddCoreMemberStatus("Error: " + (data.error || "Failed to add member"));
            }
        } catch (err) {
            setAddCoreMemberStatus("Failed to submit");
        }
        setIsAddingCoreMember(false);
    };

    const handleDeleteCoreMember = async (group, memberId) => {
        if (!confirm("Are you sure you want to remove this member?")) return;

        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
            const res = await fetch(`${API_URL}/api/core-committee?group=${group}&id=${memberId}`, { method: 'DELETE' });
            const data = await res.json();
            if (data.success) {
                fetchCoreCommittee(); // refresh
            } else {
                alert("Failed to delete member: " + data.error);
            }
        } catch (error) {
            console.error("Delete failed", error);
            alert("Delete failed due to an error.");
        }
    };

    const openEditModal = (group, member) => {
        setEditingMemberGroup(group);
        setEditingMemberId(member.id);
        setEditNameEn(member.name.en);
        setEditNameMr(member.name.mr);
        if (['coreLeaders', 'president', 'vicePresident', 'coVicePresident', 'pastPresident', 'pastVicePresident', 'pastSecretary', 'pastTreasurer'].includes(group)) {
            setEditRoleEn(member.role?.en || "");
            setEditRoleMr(member.role?.mr || "");
            setEditImg(member.img || "");
        } else {
            setEditRoleEn("");
            setEditRoleMr("");
            setEditImg("");
        }
        setEditImgFile(null);
        setEditImgMode(member.img ? "url" : "upload");
        setIsEditModalOpen(true);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        if (!editNameEn || !editNameMr) return;
        setIsSubmittingEdit(true);

        try {
            const payloadData = { id: editingMemberId, nameEn: editNameEn, nameMr: editNameMr };
            if (['coreLeaders', 'president', 'vicePresident', 'coVicePresident', 'pastPresident', 'pastVicePresident', 'pastSecretary', 'pastTreasurer'].includes(editingMemberGroup)) {
                payloadData.roleEn = editRoleEn;
                payloadData.roleMr = editRoleMr;
                if (editImgMode === 'url' && editImg) {
                    payloadData.img = editImg;
                }
            }

            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
            const formData = new FormData();
            formData.append('group', editingMemberGroup);
            formData.append('action', 'edit-member');
            formData.append('data', JSON.stringify(payloadData));
            if (editImgMode === 'upload' && editImgFile) {
                formData.append('memberImg', editImgFile);
            }

            const res = await fetch(`${API_URL}/api/core-committee`, {
                method: "POST",
                body: formData
            });
            const data = await res.json();
            if (data.success) {
                fetchCoreCommittee();
                setIsEditModalOpen(false);
            } else {
                alert("Failed to edit member: " + data.error);
            }
        } catch (error) {
            console.error("Edit failed", error);
            alert("Edit failed due to an error.");
        }
        setIsSubmittingEdit(false);
    };

    const handleAddEvent = async (e) => {
        e.preventDefault();
        if (!eventTitleEn || !eventTitleMr || !eventDate) return;
        setIsSubmittingEvent(true);
        setEventStatusMsg("");

        try {
            let formattedDateEn = "";
            let formattedDateMr = "";
            if (eventDate) {
                const dateObj = new Date(eventDate);
                formattedDateEn = dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
                formattedDateMr = dateObj.toLocaleDateString('mr-IN', { month: 'long', day: 'numeric', year: 'numeric' });
            }

            let formattedTimeEn = "";
            let formattedTimeMr = "";
            if (eventTime) {
                const [hh, mm] = eventTime.split(':');
                const dateObj = new Date();
                dateObj.setHours(parseInt(hh), parseInt(mm));
                formattedTimeEn = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
                formattedTimeMr = dateObj.toLocaleTimeString('mr-IN', { hour: '2-digit', minute: '2-digit' });
            }

            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

            const formData = new FormData();
            if (editingEventId) formData.append('id', editingEventId);
            formData.append('titleEn', eventTitleEn);
            formData.append('titleMr', eventTitleMr);
            formData.append('dateEn', formattedDateEn);
            formData.append('dateMr', formattedDateMr);
            formData.append('timeEn', formattedTimeEn);
            formData.append('timeMr', formattedTimeMr);
            formData.append('dateRaw', eventDate);
            formData.append('timeRaw', eventTime);
            formData.append('locEn', eventLocEn);
            formData.append('locMr', eventLocMr);
            formData.append('descEn', eventDescEn);
            formData.append('descMr', eventDescMr);
            formData.append('type', eventType);
            if (eventPoster) formData.append('poster', eventPoster);

            const res = await fetch(`${API_URL}/api/events`, {
                method: "POST",
                body: formData
            });

            const data = await res.json();
            if (data.success) {
                setEventStatusMsg(editingEventId ? "Event updated successfully!" : "Event added successfully!");
                resetEventForm();
                fetchEvents();
            } else {
                setEventStatusMsg("Error: " + (data.error || "Failed to save event"));
            }
            setTimeout(() => setEventStatusMsg(""), 3000);
        } catch (err) {
            setEventStatusMsg("Failed to submit event");
        } finally {
            setIsSubmittingEvent(false);
        }
    };

    const resetEventForm = () => {
        setEditingEventId(null);
        setEventTitleEn(""); setEventTitleMr("");
        setEventDate(""); setEventTime("");
        setEventLocEn(""); setEventLocMr("");
        setEventDescEn(""); setEventDescMr("");
        setEventType("general");
        setEventPoster(null);
        if (eventPosterRef.current) eventPosterRef.current.value = "";
    };

    const handleEditEventClick = (ev) => {
        setEditingEventId(ev.id);
        setEventTitleEn(ev.title.en);
        setEventTitleMr(ev.title.mr);
        setEventDate(ev.dateRaw || "");
        setEventTime(ev.timeRaw || "");
        setEventLocEn(ev.loc?.en || "");
        setEventLocMr(ev.loc?.mr || "");
        setEventDescEn(ev.desc?.en || "");
        setEventDescMr(ev.desc?.mr || "");
        setEventType(ev.type || "general");
        setEventPoster(null);
        if (eventPosterRef.current) eventPosterRef.current.value = "";
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDeleteEvent = async (id) => {
        if (!confirm("Are you sure you want to delete this event?")) return;
        setIsDeletingEvent(true);
        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
            const res = await fetch(`${API_URL}/api/events?id=${id}`, { method: 'DELETE' });
            const data = await res.json();
            if (data.success) {
                fetchEvents();
            } else {
                alert("Failed to delete event: " + data.error);
            }
        } catch (error) {
            alert("Delete failed due to an error.");
        }
        setIsDeletingEvent(false);
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#fffdfc] flex items-center justify-center p-6 relative">
                <button
                    onClick={() => setLang(lang === 'en' ? 'mr' : 'en')}
                    className="absolute top-4 right-4 px-3 py-1.5 rounded-full border-2 border-[#8b0000] text-[#8b0000] hover:bg-[#8b0000] hover:text-white transition-colors text-sm font-bold"
                >
                    {lang === 'en' ? 'मराठी' : 'English'}
                </button>
                <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-2xl border border-gray-100 max-w-md w-full text-center space-y-6">
                    <ShieldCheck size={48} className="mx-auto text-[#8b0000]" />
                    <h1 className="text-2xl font-bold font-serif text-[#4a0808]">{t('adminAccess')}</h1>
                    <p className="text-gray-500 text-sm">{t('loginPrompt')}</p>

                    <div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 bg-red-50 border border-red-200 text-[#4a0808] placeholder-red-300 rounded focus:outline-none focus:ring-2 focus:ring-[#8b0000] focus:bg-white transition-colors"
                            placeholder={t('enterPassword')}
                        />
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    </div>

                    <button type="submit" className="w-full bg-[#8b0000] text-white py-2 rounded font-bold hover:bg-[#a50d0d] transition-colors">
                        {t('login')}
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fef5f5] font-sans">
            {/* Header */}
            <header className="bg-[#4a0808] text-[#fceabb] py-6 px-6 shadow-md border-b-4 border-[#be1111] flex justify-between items-center">
                <div>
                    <h1 className="text-xl md:text-2xl font-bold font-serif">{t('adminControl')}</h1>
                    <p className="text-sm opacity-80">{t('manageFeatures')}</p>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setLang(lang === 'en' ? 'mr' : 'en')}
                        className="px-3 py-1.5 rounded-full border-2 border-[#fceabb] text-[#fceabb] hover:bg-[#fceabb] hover:text-[#4a0808] transition-colors text-sm font-bold"
                    >
                        {lang === 'en' ? 'मराठी' : 'English'}
                    </button>
                    <Link href="/" className="flex items-center gap-2 hover:text-white transition-colors text-sm font-semibold">
                        <ArrowLeft size={16} /> {t('backToSite')}
                    </Link>
                </div>
            </header>

            {/* Dashboard Content */}
            <main className="max-w-4xl mx-auto p-6 mt-8 space-y-8">

                <div className="bg-white rounded-xl shadow-lg border border-red-100 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-start gap-4">
                        <div className={`p-4 rounded-full ${isLive ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-500'}`}>
                            <Radio size={32} className={isLive ? "animate-pulse" : ""} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">{t('liveStreamTitle')}</h2>
                            <p className="text-gray-500 text-sm mt-1 max-w-md">
                                {t('liveStreamDesc')}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <button
                            onClick={toggleLiveStatus}
                            disabled={isLoading}
                            className={`relative inline-flex h-10 w-[72px] items-center rounded-full transition-colors focus:outline-none shadow-inner ${isLive ? 'bg-green-500' : 'bg-gray-300'}`}
                        >
                            <span className={`inline-block h-8 w-8 transform rounded-full bg-white transition-transform shadow-md ${isLive ? 'translate-x-[34px]' : 'translate-x-1'}`} />
                        </button>
                        <span className={`font-bold text-sm ${isLive ? 'text-green-600' : 'text-gray-500'}`}>
                            {isLive ? t('currentlyLive') : t('hidden')}
                        </span>
                    </div>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded text-sm text-yellow-800">
                    <strong>{t('liveNote')}</strong> {t('liveNoteDesc')}
                </div>

                {/* Tab Navigation Menu */}
                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-3">
                    <button
                        onClick={() => {
                            setActiveTab("core-committee");
                            setCoreListTarget("president");
                        }}
                        className={`p-4 rounded-xl border text-left flex items-center gap-3 transition-all ${activeTab === "core-committee" ? 'bg-[#8b0000] border-[#8b0000] text-white shadow-md' : 'bg-white border-red-100 text-[#4a0808] hover:border-red-300 hover:shadow-sm'
                            }`}
                    >
                        <Crown size={24} className={activeTab === "core-committee" ? 'text-[#fceabb]' : 'text-[#8b0000]'} />
                        <span className="font-bold">{t('coreCommittee')}</span>
                    </button>
                    <button
                        onClick={() => setActiveTab("sub-committee")}
                        className={`p-4 rounded-xl border text-left flex items-center gap-3 transition-all ${activeTab === "sub-committee" ? 'bg-[#8b0000] border-[#8b0000] text-white shadow-md' : 'bg-white border-red-100 text-[#4a0808] hover:border-red-300 hover:shadow-sm'
                            }`}
                    >
                        <Users size={24} className={activeTab === "sub-committee" ? 'text-[#fceabb]' : 'text-[#8b0000]'} />
                        <span className="font-bold">{t('subCommittees')}</span>
                    </button>
                    <button
                        onClick={() => setActiveTab("gallery")}
                        className={`p-4 rounded-xl border text-left flex items-center gap-3 transition-all ${activeTab === "gallery" ? 'bg-[#8b0000] border-[#8b0000] text-white shadow-md' : 'bg-white border-red-100 text-[#4a0808] hover:border-red-300 hover:shadow-sm'
                            }`}
                    >
                        <ImageIcon size={24} className={activeTab === "gallery" ? 'text-[#fceabb]' : 'text-[#8b0000]'} />
                        <span className="font-bold">{t('photoGallery')}</span>
                    </button>
                    <button
                        onClick={() => setActiveTab("events")}
                        className={`p-4 rounded-xl border text-left flex items-center gap-3 transition-all ${activeTab === "events" ? 'bg-[#8b0000] border-[#8b0000] text-white shadow-md' : 'bg-white border-red-100 text-[#4a0808] hover:border-red-300 hover:shadow-sm'
                            }`}
                    >
                        <Calendar size={24} className={activeTab === "events" ? 'text-[#fceabb]' : 'text-[#8b0000]'} />
                        <span className="font-bold">{t('upcomingEvents')}</span>
                    </button>
                    <button
                        onClick={() => {
                            setActiveTab("past-committee");
                            setCoreListTarget("pastPresident");
                        }}
                        className={`p-4 rounded-xl border text-left flex items-center gap-3 transition-all ${activeTab === "past-committee" ? 'bg-[#8b0000] border-[#8b0000] text-white shadow-md' : 'bg-white border-red-100 text-[#4a0808] hover:border-red-300 hover:shadow-sm'
                            }`}
                    >
                        <Star size={24} className={activeTab === "past-committee" ? 'text-[#fceabb]' : 'text-[#8b0000]'} />
                        <span className="font-bold">Past Committee</span>
                    </button>
                    <button
                        onClick={() => setActiveTab("inventory")}
                        className={`p-4 rounded-xl border text-left flex items-center gap-3 transition-all ${activeTab === "inventory" ? 'bg-[#8b0000] border-[#8b0000] text-white shadow-md' : 'bg-white border-red-100 text-[#4a0808] hover:border-red-300 hover:shadow-sm'
                            }`}
                    >
                        <HeartHandshake size={24} className={activeTab === "inventory" ? 'text-[#fceabb]' : 'text-[#8b0000]'} />
                        <span className="font-bold">Social Work</span>
                    </button>
                </div>

                {/* Photo Gallery Upload */}
                {activeTab === "gallery" && (
                    <>
                        <div className="bg-white rounded-xl shadow-lg border border-red-100 p-6 md:p-8 mt-8">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="p-4 rounded-full bg-blue-100 text-blue-600">
                                    <ImageIcon size={32} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800">{t('uploadToGallery')}</h2>
                                    <p className="text-gray-500 text-sm mt-1 max-w-md">
                                        {t('galleryDesc')}
                                    </p>
                                </div>
                            </div>
                            <form onSubmit={handleUpload} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-[#8b0000] mb-1">{t('imageFile')}</label>
                                    <input ref={fileInputRef} type="file" required accept="image/*" onChange={e => setUploadFile(e.target.files[0])} className="w-full px-4 py-2 bg-red-50 border border-red-200 text-[#4a0808] rounded focus:ring-2 focus:ring-[#8b0000] focus:bg-white transition-colors file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#8b0000] file:text-white hover:file:bg-[#6b0808]" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-[#8b0000] mb-1">{t('year')}</label>
                                        <input type="number" required value={uploadYear} onChange={e => setUploadYear(e.target.value)} className="w-full px-4 py-2 bg-red-50 border border-red-200 text-[#4a0808] placeholder-red-300 rounded focus:ring-2 focus:ring-[#8b0000] focus:bg-white transition-colors" placeholder="e.g. 2024" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-[#8b0000] mb-1">{t('captionEn')}</label>
                                        <input type="text" required value={uploadAltEn} onChange={e => setUploadAltEn(e.target.value)} className="w-full px-4 py-2 bg-red-50 border border-red-200 text-[#4a0808] placeholder-red-300 rounded focus:ring-2 focus:ring-[#8b0000] focus:bg-white transition-colors" placeholder="e.g. Ganpati 2024" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-[#8b0000] mb-1">{t('captionMr')}</label>
                                        <input type="text" required value={uploadAltMr} onChange={e => setUploadAltMr(e.target.value)} className="w-full px-4 py-2 bg-red-50 border border-red-200 text-[#4a0808] placeholder-red-300 rounded focus:ring-2 focus:ring-[#8b0000] focus:bg-white transition-colors" placeholder="e.g. गणपती २०२४" />
                                    </div>
                                </div>
                                <button type="submit" disabled={isUploading} className="bg-[#8b0000] text-white px-6 py-2 rounded font-bold hover:bg-[#6b0808] transition-colors disabled:opacity-50">
                                    {isUploading ? t('uploading') : t('uploadPhoto')}
                                </button>
                                {uploadStatus && <p className={`text-sm font-medium mt-2 ${uploadStatus.includes("Error") || uploadStatus.includes("Failed") ? 'text-red-600' : 'text-green-600'}`}>{uploadStatus}</p>}
                            </form>
                        </div>

                        {/* Gallery History List */}
                        <div className="bg-white rounded-xl shadow-lg border border-red-100 p-6 md:p-8 mt-8">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-gray-800">{t('uploadedPhotos')} ({galleryItems.length})</h2>
                                <button
                                    onClick={() => setShowHistory(!showHistory)}
                                    className="text-sm font-semibold border-2 border-[#8b0000] text-[#8b0000] hover:bg-[#8b0000] hover:text-white px-4 py-1.5 rounded-full transition-colors"
                                >
                                    {showHistory ? t('hideHistory') : t('showHistory')}
                                </button>
                            </div>

                            {showHistory && (
                                <>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="border-b-2 border-red-100 text-[#8b0000] text-sm">
                                                    <th className="pb-3 px-2">{t('image')}</th>
                                                    <th className="pb-3 px-2">{t('year')}</th>
                                                    <th className="pb-3 px-2">{t('caption')}</th>
                                                    <th className="pb-3 px-2 text-right">{t('action')}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {galleryItems.slice(0, visibleCount).map((item) => (
                                                    <tr key={item.id} className="border-b border-gray-100 hover:bg-red-50/50 transition-colors">
                                                        <td className="py-3 px-2">
                                                            <div className="w-16 h-16 rounded overflow-hidden shadow-sm border border-gray-200 bg-gray-50">
                                                                <img src={getImageUrl(item.src)} alt={item.alt?.en || "Image"} className="w-full h-full object-cover" />
                                                            </div>
                                                        </td>
                                                        <td className="py-3 px-2 font-medium text-gray-700">{item.year}</td>
                                                        <td className="py-3 px-2">
                                                            <p className="text-sm font-semibold text-gray-800 mb-1">{item.alt?.en}</p>
                                                            <p className="text-sm text-gray-500">{item.alt?.mr}</p>
                                                        </td>
                                                        <td className="py-3 px-2 text-right">
                                                            <button
                                                                onClick={() => handleDelete(item.id)}
                                                                disabled={isDeleting}
                                                                className="text-red-500 hover:text-red-700 hover:bg-red-100 p-2 rounded transition-colors disabled:opacity-50"
                                                                title="Delete Image"
                                                            >
                                                                <Trash2 size={20} />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                                {galleryItems.length === 0 && (
                                                    <tr>
                                                        <td colSpan="4" className="py-8 text-center text-gray-500 italic">{t('noPhotos')}</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Pagination Buttons */}
                                    <div className="mt-6 flex justify-center gap-4">
                                        {visibleCount < galleryItems.length && (
                                            <button
                                                onClick={() => setVisibleCount(prev => prev + 5)}
                                                className="text-sm font-semibold border-2 border-[#8b0000] text-[#8b0000] hover:bg-[#8b0000] hover:text-white px-6 py-2 rounded-full transition-colors"
                                            >
                                                {t('showMore')}
                                            </button>
                                        )}
                                        {visibleCount > 5 && (
                                            <button
                                                onClick={() => setVisibleCount(5)}
                                                className="text-sm font-semibold border-2 border-gray-300 text-gray-600 hover:bg-gray-100 px-6 py-2 rounded-full transition-colors"
                                            >
                                                {t('showLess')}
                                            </button>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </>
                )}

                {/* Upcoming Events Management */}
                {activeTab === "events" && (
                    <div className="bg-white rounded-xl shadow-lg border border-red-100 p-6 md:p-8 mt-8">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="p-4 rounded-full bg-teal-100 text-teal-600">
                                <Calendar size={32} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">{t('manageEvents')}</h2>
                                <p className="text-gray-500 text-sm mt-1 max-w-md">
                                    {t('eventsDesc')}
                                </p>
                            </div>
                        </div>

                        {/* Add/Edit Event Form */}
                        <div className="bg-gray-50 p-6 rounded-lg mb-8 border border-gray-200">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold text-[#8b0000]">{editingEventId ? t('editEvent') : t('addNewEvent')}</h3>
                                {editingEventId && (
                                    <button onClick={resetEventForm} className="text-sm font-medium text-gray-500 hover:text-gray-800 flex items-center gap-1">
                                        <X size={16} /> {t('cancelEdit')}
                                    </button>
                                )}
                            </div>
                            <form onSubmit={handleAddEvent} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-[#8b0000] mb-1">{t('eventTitleEn')}</label>
                                        <input type="text" required value={eventTitleEn} onChange={e => setEventTitleEn(e.target.value)} className="w-full px-4 py-2 bg-white border border-red-200 text-[#4a0808] rounded focus:ring-2 focus:ring-[#8b0000] focus:bg-white transition-colors" placeholder="e.g. Ganeshotsav 2026 Preparations" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-[#8b0000] mb-1">{t('eventTitleMr')}</label>
                                        <input type="text" required value={eventTitleMr} onChange={e => setEventTitleMr(e.target.value)} className="w-full px-4 py-2 bg-white border border-red-200 text-[#4a0808] rounded focus:ring-2 focus:ring-[#8b0000] focus:bg-white transition-colors" placeholder="e.g. गणेशोत्सव २०२६ पूर्वतयारी" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-[#8b0000] mb-1">{t('eventDate')}</label>
                                        <input type="date" required value={eventDate} onChange={e => setEventDate(e.target.value)} onClick={(e) => e.target.showPicker()} className="w-full px-4 py-2 bg-white border border-red-200 text-[#4a0808] rounded focus:ring-2 focus:ring-[#8b0000] focus:bg-white transition-colors cursor-pointer" />
                                        <p className="text-xs text-gray-500 mt-1">{t('dateNote')}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-[#8b0000] mb-1">{t('eventTime')}</label>
                                        <input type="time" value={eventTime} onChange={e => setEventTime(e.target.value)} onClick={(e) => e.target.showPicker()} className="w-full px-4 py-2 bg-white border border-red-200 text-[#4a0808] rounded focus:ring-2 focus:ring-[#8b0000] focus:bg-white transition-colors cursor-pointer" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-[#8b0000] mb-1">{t('locationEn')}</label>
                                        <input type="text" value={eventLocEn} onChange={e => setEventLocEn(e.target.value)} className="w-full px-4 py-2 bg-white border border-red-200 text-[#4a0808] rounded focus:ring-2 focus:ring-[#8b0000] focus:bg-white transition-colors" placeholder="e.g. Mandal Karyalay" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-[#8b0000] mb-1">{t('locationMr')}</label>
                                        <input type="text" value={eventLocMr} onChange={e => setEventLocMr(e.target.value)} className="w-full px-4 py-2 bg-white border border-red-200 text-[#4a0808] rounded focus:ring-2 focus:ring-[#8b0000] focus:bg-white transition-colors" placeholder="e.g. मंडळ कार्यालय" />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-semibold text-[#8b0000] mb-1">{t('eventType')}</label>
                                        <select
                                            value={eventType}
                                            onChange={e => setEventType(e.target.value)}
                                            className="w-full px-4 py-2 bg-white border border-red-200 text-[#4a0808] rounded focus:ring-2 focus:ring-[#8b0000] focus:bg-white transition-colors"
                                        >
                                            <option value="general">General (सामान्य)</option>
                                            <option value="meeting">Meeting (बैठक)</option>
                                            <option value="social">Social Work (सामाजिक उपक्रम)</option>
                                            <option value="celebration">Celebration (उत्सव)</option>
                                        </select>
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-semibold text-[#8b0000] mb-1">{t('descEn')}</label>
                                        <textarea rows={2} value={eventDescEn} onChange={e => setEventDescEn(e.target.value)} className="w-full px-4 py-2 bg-white border border-red-200 text-[#4a0808] rounded focus:ring-2 focus:ring-[#8b0000] focus:bg-white transition-colors" placeholder="Short details about the event..."></textarea>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-semibold text-[#8b0000] mb-1">{t('descMr')}</label>
                                        <textarea rows={2} value={eventDescMr} onChange={e => setEventDescMr(e.target.value)} className="w-full px-4 py-2 bg-white border border-red-200 text-[#4a0808] rounded focus:ring-2 focus:ring-[#8b0000] focus:bg-white transition-colors" placeholder="कार्यक्रमाची थोडक्यात माहिती..."></textarea>
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-semibold text-[#8b0000] mb-1">{t('eventPoster')}</label>
                                        <p className="text-xs text-gray-500 mb-2">{t('posterNote')}</p>
                                        <input ref={eventPosterRef} type="file" accept="image/*" onChange={e => setEventPoster(e.target.files[0])} className="w-full px-4 py-2 bg-white border border-red-200 text-[#4a0808] rounded focus:ring-2 focus:ring-[#8b0000] focus:bg-white transition-colors file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#8b0000] file:text-white hover:file:bg-[#6b0808]" />
                                        {editingEventId && events.find(e => e.id === editingEventId)?.poster && !eventPoster && (
                                            <p className="text-xs text-green-600 mt-1">✓ Current poster will be kept unless you upload a new one.</p>
                                        )}
                                    </div>
                                </div>
                                <button type="submit" disabled={isSubmittingEvent} className="bg-[#8b0000] text-white px-6 py-2 rounded font-bold hover:bg-[#6b0808] transition-colors disabled:opacity-50">
                                    {isSubmittingEvent ? (editingEventId ? t('saving') : t('adding')) : (editingEventId ? t('updateEvent') : t('addEvent'))}
                                </button>
                                {eventStatusMsg && <p className={`text-sm font-medium mt-2 ${eventStatusMsg.includes("Error") || eventStatusMsg.includes("Failed") ? 'text-red-600' : 'text-green-600'}`}>{eventStatusMsg}</p>}
                            </form>
                        </div>

                        {/* Events List */}
                        <div>
                            <h3 className="font-semibold text-[#8b0000] mb-4">{t('currentEvents')}</h3>
                            {events && events.length > 0 ? (
                                <div className="space-y-4">
                                    {events.map((ev) => (
                                        <div key={ev.id} className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm flex flex-col md:flex-row justify-between md:items-center p-4">
                                            <div className="flex-1 mb-4 md:mb-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="bg-red-50 text-[#8b0000] text-xs font-bold uppercase tracking-wide px-2 py-0.5 rounded border border-red-100">{ev.type}</span>
                                                    <h4 className="font-bold text-[#4a0808]">{ev.title.en}</h4>
                                                </div>
                                                <p className="text-sm font-medium text-gray-600">{ev.title.mr}</p>
                                                <div className="mt-2 text-xs text-gray-500 flex flex-wrap gap-4">
                                                    <span className="flex items-center gap-1"><Calendar size={14} /> {ev.date.en}</span>
                                                    {ev.time?.en && <span className="flex items-center gap-1"><Clock size={14} /> {ev.time.en}</span>}
                                                    {ev.loc?.en && <span className="flex items-center gap-1"><MapPin size={14} /> {ev.loc.en}</span>}
                                                </div>
                                                {ev.poster && (
                                                    <div className="mt-2">
                                                        <img src={ev.poster} alt="Event poster" className="w-24 h-24 object-cover rounded border border-gray-200 shadow-sm" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex flex-col gap-2 self-start md:self-auto min-w-[120px]">
                                                <button
                                                    onClick={() => handleEditEventClick(ev)}
                                                    className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded transition-colors border border-blue-100 flex items-center justify-center w-full"
                                                    title="Edit Event"
                                                >
                                                    <Edit size={16} className="mr-2" />
                                                    <span className="text-sm font-semibold">{t('edit')}</span>
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteEvent(ev.id)}
                                                    disabled={isDeletingEvent}
                                                    className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded transition-colors disabled:opacity-50 border border-red-100 flex items-center justify-center w-full"
                                                    title="Delete Event"
                                                >
                                                    <Trash2 size={16} className="mr-2" />
                                                    <span className="text-sm font-semibold">{t('delete')}</span>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-6 bg-gray-50 rounded-lg text-gray-500 border border-gray-200">
                                    {t('noEvents')}
                                </div>
                            )}
                        </div>
                    </div>
                )
                }

                {/* Sub-Committee Management */}
                {
                    activeTab === "sub-committee" && (
                        <div className="bg-white rounded-xl shadow-lg border border-red-100 p-6 md:p-8 mt-8">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="p-4 rounded-full bg-purple-100 text-purple-600">
                                    <Users size={32} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800">{t('subCommMgmt')}</h2>
                                    <p className="text-gray-500 text-sm mt-1 max-w-md">
                                        {t('subCommDesc')}
                                    </p>
                                </div>
                            </div>

                            {/* Create New Sub-Committee Form */}
                            <div className="bg-gray-50 p-6 rounded-lg mb-8 border border-gray-200">
                                <h3 className="font-semibold text-[#8b0000] mb-4">{t('createNewSubComm')}</h3>
                                <form onSubmit={handleAddSubCommittee} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-[#8b0000] mb-1">{t('commNameEn')}</label>
                                            <input type="text" required value={newSubTitleEn} onChange={e => setNewSubTitleEn(e.target.value)} className="w-full px-4 py-2 bg-white border border-red-200 text-[#4a0808] placeholder-red-300 rounded focus:ring-2 focus:ring-[#8b0000] focus:bg-white transition-colors" placeholder="e.g. Decoration Committee" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-[#8b0000] mb-1">{t('commNameMr')}</label>
                                            <input type="text" required value={newSubTitleMr} onChange={e => setNewSubTitleMr(e.target.value)} className="w-full px-4 py-2 bg-white border border-red-200 text-[#4a0808] placeholder-red-300 rounded focus:ring-2 focus:ring-[#8b0000] focus:bg-white transition-colors" placeholder="e.g. सजावट समिती" />
                                        </div>
                                    </div>
                                    <button type="submit" disabled={isAddingSub} className="bg-[#8b0000] text-white px-6 py-2 rounded font-bold hover:bg-[#6b0808] transition-colors disabled:opacity-50">
                                        {isAddingSub ? t('creating') : t('createComm')}
                                    </button>
                                    {addSubStatus && <p className={`text-sm font-medium mt-2 ${addSubStatus.includes("Error") || addSubStatus.includes("Failed") ? 'text-red-600' : 'text-green-600'}`}>{addSubStatus}</p>}
                                </form>
                            </div>

                            {/* Add Member Form */}
                            <div className="bg-gray-50 p-6 rounded-lg mb-8 border border-gray-200">
                                <h3 className="font-semibold text-[#8b0000] mb-4">{t('addNewMember')}</h3>
                                <form onSubmit={handleAddMember} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-[#8b0000] mb-1">{t('selectSubComm')}</label>
                                            <select
                                                value={selectedSubCommittee}
                                                onChange={e => setSelectedSubCommittee(e.target.value)}
                                                className="w-full px-4 py-2 bg-white border border-red-200 text-[#4a0808] rounded focus:ring-2 focus:ring-[#8b0000] focus:bg-white transition-colors"
                                            >
                                                {subCommittees && subCommittees.map(sub => (
                                                    <option key={sub.id} value={sub.id}>{sub.title.en} ({sub.title.mr})</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-[#8b0000] mb-1">{t('memberNameEn')}</label>
                                            <input type="text" required value={memberNameEn} onChange={e => setMemberNameEn(e.target.value)} className="w-full px-4 py-2 bg-white border border-red-200 text-[#4a0808] placeholder-red-300 rounded focus:ring-2 focus:ring-[#8b0000] focus:bg-white transition-colors" placeholder="e.g. John Doe" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-[#8b0000] mb-1">{t('memberNameMr')}</label>
                                            <input type="text" required value={memberNameMr} onChange={e => setMemberNameMr(e.target.value)} className="w-full px-4 py-2 bg-white border border-red-200 text-[#4a0808] placeholder-red-300 rounded focus:ring-2 focus:ring-[#8b0000] focus:bg-white transition-colors" placeholder="e.g. जॉन डो" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-[#8b0000] mb-1">{lang === 'mr' ? 'भूमिका (ऐच्छिक)' : 'Role (Optional)'}</label>
                                        <select
                                            value={memberRole}
                                            onChange={e => setMemberRole(e.target.value)}
                                            className="w-full md:w-64 px-4 py-2 bg-white border border-red-200 text-[#4a0808] rounded focus:ring-2 focus:ring-[#8b0000] focus:bg-white transition-colors"
                                        >
                                            <option value="">{lang === 'mr' ? 'सदस्य (सामान्य)' : 'Member (Regular)'}</option>
                                            <option value="head">{lang === 'mr' ? 'प्रमुख (Head)' : 'Head (प्रमुख)'}</option>
                                            <option value="jt-head">{lang === 'mr' ? 'सह-प्रमुख (Jt. Head)' : 'Jt. Head (सह-प्रमुख)'}</option>
                                        </select>
                                    </div>
                                    <button type="submit" disabled={isAddingMember} className="bg-[#8b0000] text-white px-6 py-2 rounded font-bold hover:bg-[#6b0808] transition-colors disabled:opacity-50">
                                        {isAddingMember ? t('adding') : t('addMember')}
                                    </button>
                                    {addMemberStatus && <p className={`text-sm font-medium mt-2 ${addMemberStatus.includes("Error") || addMemberStatus.includes("Failed") ? 'text-red-600' : 'text-green-600'}`}>{addMemberStatus}</p>}
                                </form>
                            </div>

                            {/* Manage Members List */}
                            <div>
                                <h3 className="font-semibold text-[#8b0000] mb-4">{t('currentMembers')}</h3>
                                {subCommittees && subCommittees.length > 0 ? (
                                    <div className="space-y-6">
                                        {subCommittees.map((sub) => (
                                            <div key={sub.id} className="border border-gray-200 rounded-lg overflow-hidden">
                                                <div className="bg-gray-100 px-4 py-3 font-semibold text-gray-800 border-b border-gray-200 flex justify-between items-center">
                                                    <span>{sub.title.en} <span className="text-gray-500 font-normal text-sm">({sub.title.mr})</span></span>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm bg-white px-2 py-0.5 rounded-full border border-gray-300 text-gray-600">{sub.members ? sub.members.length : 0} {t('members')}</span>
                                                        <button onClick={() => handleDeleteSubCommittee(sub.id)} className="text-red-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded transition-colors" title="Delete Sub-Committee">
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </div>
                                                <ul className="divide-y divide-gray-100">
                                                    {sub.members && sub.members.length > 0 ? (
                                                        sub.members.map((member) => (
                                                            <li key={member.id} className="p-4 flex justify-between items-center hover:bg-red-50/50 transition-colors">
                                                                <div>
                                                                    <p className="font-medium text-gray-800">
                                                                        {member.name.en}
                                                                        {member.role?.en && <span className="ml-2 text-xs font-bold px-2 py-0.5 rounded-full bg-[#8b0000] text-white">{member.role.en}</span>}
                                                                    </p>
                                                                    <p className="text-sm text-gray-500">{member.name.mr}{member.role?.mr ? ` (${member.role.mr})` : ''}</p>
                                                                </div>
                                                                <div className="flex gap-2">
                                                                    <button
                                                                        onClick={() => openSubEdit(sub.id, member)}
                                                                        className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 p-2 rounded transition-colors"
                                                                        title="Edit Member"
                                                                    >
                                                                        <Edit size={18} />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleDeleteMember(sub.id, member.id)}
                                                                        disabled={isDeletingMember}
                                                                        className="text-red-500 hover:text-red-700 hover:bg-red-100 p-2 rounded transition-colors disabled:opacity-50"
                                                                        title="Remove Member"
                                                                    >
                                                                        <Trash2 size={18} />
                                                                    </button>
                                                                </div>
                                                            </li>
                                                        ))
                                                    ) : (
                                                        <li className="p-4 text-center text-gray-500 italic text-sm">{t('noMembers')}</li>
                                                    )}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-6 text-gray-500 italic">{t('loadingSubComm')}</div>
                                )}
                            </div>
                        </div>
                    )
                }

                {/* Core Committee Management */}
                {
                    activeTab === "core-committee" && (
                        <div className="bg-white rounded-xl shadow-lg border border-red-100 p-6 md:p-8 mt-8">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="p-4 rounded-full bg-amber-100 text-amber-600">
                                    <Crown size={32} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800">{t('coreCommMgmt')}</h2>
                                    <p className="text-gray-500 text-sm mt-1 max-w-md">
                                        {t('coreCommDesc')}
                                    </p>
                                </div>
                            </div>

                            {/* Add List Member Form */}
                            <div className="bg-gray-50 p-6 rounded-lg mb-8 border border-gray-200">
                                <h3 className="font-semibold text-[#8b0000] mb-4 flex items-center gap-2"><Users size={18} /> {t('addCoreMember')}</h3>
                                <form onSubmit={handleAddCoreMember} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-[#8b0000] mb-1">{t('selectGroup')}</label>
                                            <select
                                                value={coreListTarget}
                                                onChange={e => setCoreListTarget(e.target.value)}
                                                className="w-full px-4 py-2 bg-white border border-red-200 text-[#4a0808] rounded focus:ring-2 focus:ring-[#8b0000] focus:bg-white transition-colors"
                                            >
                                                <option value="president">President (अध्यक्ष)</option>
                                                <option value="vicePresident">Vice President (उपाध्यक्ष)</option>
                                                <option value="coVicePresident">Co-Vice President (सह-उपाध्यक्ष)</option>
                                                <option value="coreLeaders">Core Leaders (उदा. सचिव, खजिनदार)</option>
                                                <option value="advisors">Advisory Board (सल्लागार मंडळ)</option>
                                                <option value="members">Working Members (कार्यकारी सदस्य)</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-[#8b0000] mb-1">{t('memberNameEn')}</label>
                                            <input type="text" required value={coreListNameEn} onChange={e => setCoreListNameEn(e.target.value)} className="w-full px-4 py-2 bg-white border border-red-200 text-[#4a0808] placeholder-red-300 rounded focus:ring-2 focus:ring-[#8b0000] focus:bg-white transition-colors" placeholder="e.g. John Doe" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-[#8b0000] mb-1">{t('memberNameMr')}</label>
                                            <input type="text" required value={coreListNameMr} onChange={e => setCoreListNameMr(e.target.value)} className="w-full px-4 py-2 bg-white border border-red-200 text-[#4a0808] placeholder-red-300 rounded focus:ring-2 focus:ring-[#8b0000] focus:bg-white transition-colors" placeholder="e.g. जॉन डो" />
                                        </div>
                                    </div>

                                    {/* Extra fields for Top Roles */}
                                    {['coreLeaders', 'president', 'vicePresident', 'coVicePresident'].includes(coreListTarget) && (
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                            <div className="col-span-1 md:col-span-3 lg:col-span-2">
                                                <label className="block text-sm font-semibold text-[#8b0000] mb-2">{lang === 'mr' ? 'फोटो (ऐच्छिक)' : 'Photo (Optional)'}</label>
                                                <div className="flex gap-2 mb-2">
                                                    <button type="button" onClick={() => setCoreListImgMode('upload')} className={`px-3 py-1 text-xs rounded font-medium transition-colors ${coreListImgMode === 'upload' ? 'bg-[#8b0000] text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}>
                                                        📁 {lang === 'mr' ? 'डिव्हाइस वरून अपलोड' : 'Upload from Device'}
                                                    </button>
                                                    <button type="button" onClick={() => setCoreListImgMode('url')} className={`px-3 py-1 text-xs rounded font-medium transition-colors ${coreListImgMode === 'url' ? 'bg-[#8b0000] text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}>
                                                        🔗 {lang === 'mr' ? 'URL पेस्ट करा' : 'Paste URL'}
                                                    </button>
                                                </div>
                                                {coreListImgMode === 'upload' ? (
                                                    <div>
                                                        <input type="file" accept="image/*" ref={coreListImgRef} onChange={e => setCoreListImgFile(e.target.files[0] || null)} className="w-full px-4 py-2 bg-white border border-red-200 text-[#4a0808] rounded focus:ring-2 focus:ring-[#8b0000] transition-colors text-sm" />
                                                        {coreListImgFile && <p className="text-xs text-green-600 mt-1">✓ {coreListImgFile.name}</p>}
                                                    </div>
                                                ) : (
                                                    <input type="url" value={coreListImg} onChange={e => setCoreListImg(e.target.value)} className="w-full px-4 py-2 bg-white border border-red-200 text-[#4a0808] placeholder-red-300 rounded focus:ring-2 focus:ring-[#8b0000] focus:bg-white transition-colors" placeholder="https://..." />
                                                )}
                                                <p className="text-xs text-gray-400 mt-1">{lang === 'mr' ? 'फोटो न दिल्यास नावाच्या आद्याक्षरांचा अवतार तयार होईल' : 'If no photo is provided, an avatar with initials will be generated'}</p>
                                            </div>
                                            {coreListTarget === "coreLeaders" && (
                                                <>
                                                    <div>
                                                        <label className="block text-sm font-semibold text-[#8b0000] mb-1">{t('roleEn')}</label>
                                                        <input type="text" list="rolesEn" required value={coreListRoleEn} onChange={e => setCoreListRoleEn(e.target.value)} className="w-full px-4 py-2 bg-white border border-red-200 text-[#4a0808] placeholder-red-300 rounded focus:ring-2 focus:ring-[#8b0000] focus:bg-white transition-colors" placeholder="e.g. Secretary" />
                                                        <datalist id="rolesEn">
                                                            <option value="Secretary" />
                                                            <option value="Joint Secretary" />
                                                            <option value="Treasurer" />
                                                            <option value="Advisor" />
                                                            <option value="Coordinator" />
                                                        </datalist>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-semibold text-[#8b0000] mb-1">{t('roleMr')}</label>
                                                        <input type="text" list="rolesMr" required value={coreListRoleMr} onChange={e => setCoreListRoleMr(e.target.value)} className="w-full px-4 py-2 bg-white border border-red-200 text-[#4a0808] placeholder-red-300 rounded focus:ring-2 focus:ring-[#8b0000] focus:bg-white transition-colors" placeholder="e.g. सचिव" />
                                                        <datalist id="rolesMr">
                                                            <option value="सचिव" />
                                                            <option value="सह-सचिव" />
                                                            <option value="खजिनदार" />
                                                            <option value="सल्लागार" />
                                                            <option value="समन्वयक" />
                                                        </datalist>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    )}

                                    <button type="submit" disabled={isAddingCoreMember} className="bg-[#8b0000] text-white px-6 py-2 rounded font-bold hover:bg-[#6b0808] transition-colors disabled:opacity-50">
                                        {isAddingCoreMember ? t('adding') : t('addMember')}
                                    </button>
                                    {addCoreMemberStatus && <p className={`text-sm font-medium mt-2 ${addCoreMemberStatus.includes("Error") || addCoreMemberStatus.includes("Failed") ? 'text-red-600' : 'text-green-600'}`}>{addCoreMemberStatus}</p>}
                                </form>
                            </div>

                            {/* Manage Core Committee Members Lists */}
                            {coreCommittee && (
                                <div className="space-y-8">
                                    {/* President List */}
                                    <div>
                                        <h3 className="font-semibold text-[#8b0000] mb-3">President (अध्यक्ष)</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                            {coreCommittee.president?.map(member => (
                                                <div key={member.id} className="border border-gray-200 rounded p-4 flex justify-between items-center group relative hover:border-red-200">
                                                    <div>
                                                        <p className="font-medium text-gray-800 text-sm">{member.name.en}</p>
                                                        <p className="text-xs text-gray-500">{member.name.mr}</p>
                                                    </div>
                                                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button onClick={() => openEditModal('president', member)} className="text-blue-500 hover:text-blue-700 bg-blue-50 p-1.5 rounded">
                                                            <Edit size={16} />
                                                        </button>
                                                        <button onClick={() => handleDeleteCoreMember('president', member.id)} className="text-red-500 hover:text-red-700 bg-red-50 p-1.5 rounded">
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Vice President List */}
                                    <div>
                                        <h3 className="font-semibold text-[#8b0000] mb-3">Vice President (उपाध्यक्ष)</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                            {coreCommittee.vicePresident?.map(member => (
                                                <div key={member.id} className="border border-gray-200 rounded p-4 flex justify-between items-center group relative hover:border-red-200">
                                                    <div>
                                                        <p className="font-medium text-gray-800 text-sm">{member.name.en}</p>
                                                        <p className="text-xs text-gray-500">{member.name.mr}</p>
                                                    </div>
                                                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button onClick={() => openEditModal('vicePresident', member)} className="text-blue-500 hover:text-blue-700 bg-blue-50 p-1.5 rounded">
                                                            <Edit size={16} />
                                                        </button>
                                                        <button onClick={() => handleDeleteCoreMember('vicePresident', member.id)} className="text-red-500 hover:text-red-700 bg-red-50 p-1.5 rounded">
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Co-Vice President List */}
                                    <div>
                                        <h3 className="font-semibold text-[#8b0000] mb-3">Co-Vice President (सह-उपाध्यक्ष)</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                            {coreCommittee.coVicePresident?.map(member => (
                                                <div key={member.id} className="border border-gray-200 rounded p-4 flex justify-between items-center group relative hover:border-red-200">
                                                    <div>
                                                        <p className="font-medium text-gray-800 text-sm">{member.name.en}</p>
                                                        <p className="text-xs text-gray-500">{member.name.mr}</p>
                                                    </div>
                                                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button onClick={() => openEditModal('coVicePresident', member)} className="text-blue-500 hover:text-blue-700 bg-blue-50 p-1.5 rounded">
                                                            <Edit size={16} />
                                                        </button>
                                                        <button onClick={() => handleDeleteCoreMember('coVicePresident', member.id)} className="text-red-500 hover:text-red-700 bg-red-50 p-1.5 rounded">
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Core Leaders List */}
                                    <div>
                                        <h3 className="font-semibold text-[#8b0000] mb-3">{t('coreLeaders')}</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                            {coreCommittee.coreLeaders?.map(member => (
                                                <div key={member.id} className="border border-gray-200 rounded p-4 flex justify-between items-center group relative hover:border-red-200">
                                                    <div>
                                                        <p className="font-medium text-gray-800 text-sm">{member.name.en}</p>
                                                        <p className="text-xs text-gray-500">{member.role.en}</p>
                                                    </div>
                                                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button onClick={() => openEditModal('coreLeaders', member)} className="text-blue-500 hover:text-blue-700 bg-blue-50 p-1.5 rounded">
                                                            <Edit size={16} />
                                                        </button>
                                                        <button onClick={() => handleDeleteCoreMember('coreLeaders', member.id)} className="text-red-500 hover:text-red-700 bg-red-50 p-1.5 rounded">
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Advisors List */}
                                    <div>
                                        <h3 className="font-semibold text-[#8b0000] mb-3">{t('advisoryBoard')}</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                            {coreCommittee.advisors?.map(member => (
                                                <div key={member.id} className="bg-gray-50 border border-gray-100 rounded px-3 py-2 flex justify-between items-center group">
                                                    <span className="text-sm font-medium text-gray-700 truncate mr-2" title={member.name.en}>{member.name.en}</span>
                                                    <div className="flex gap-2">
                                                        <button onClick={() => openEditModal('advisors', member)} className="text-blue-400 hover:text-blue-600 transition-colors">
                                                            <Edit size={14} />
                                                        </button>
                                                        <button onClick={() => handleDeleteCoreMember('advisors', member.id)} className="text-red-400 hover:text-red-600 transition-colors">
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Members List */}
                                    <div>
                                        <h3 className="font-semibold text-[#8b0000] mb-3">{t('workingMembers')}</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                            {coreCommittee.members?.map(member => (
                                                <div key={member.id} className="bg-gray-50 border border-gray-100 rounded px-3 py-2 flex justify-between items-center group">
                                                    <span className="text-sm font-medium text-gray-700 truncate mr-2" title={member.name.en}>{member.name.en}</span>
                                                    <div className="flex gap-2">
                                                        <button onClick={() => openEditModal('members', member)} className="text-blue-400 hover:text-blue-600 transition-colors">
                                                            <Edit size={14} />
                                                        </button>
                                                        <button onClick={() => handleDeleteCoreMember('members', member.id)} className="text-red-400 hover:text-red-600 transition-colors">
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )
                }

                {/* Past Committee Management */}
                {
                    activeTab === "past-committee" && (
                        <div className="bg-white rounded-xl shadow-lg border border-red-100 p-6 md:p-8 mt-8">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="p-4 rounded-full bg-orange-100 text-orange-600">
                                    <Star size={32} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800">{t('pastCommMgmt')}</h2>
                                    <p className="text-gray-500 text-sm mt-1 max-w-md">
                                        {t('pastCommDesc')}
                                    </p>
                                </div>
                            </div>

                            {/* Add Past Member Form */}
                            <div className="bg-gray-50 p-6 rounded-lg mb-8 border border-gray-200">
                                <h3 className="font-semibold text-[#8b0000] mb-4 flex items-center gap-2"><Users size={18} /> {t('addPastMember')}</h3>
                                <form onSubmit={handleAddCoreMember} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-[#8b0000] mb-1">{t('selectGroup')}</label>
                                            <select
                                                value={coreListTarget}
                                                onChange={e => setCoreListTarget(e.target.value)}
                                                className="w-full px-4 py-2 bg-white border border-red-200 text-[#4a0808] rounded focus:ring-2 focus:ring-[#8b0000] focus:bg-white transition-colors"
                                            >
                                                <option value="pastPresident">{t('pastPresident')}</option>
                                                <option value="pastVicePresident">{t('pastVicePresident')}</option>
                                                <option value="pastSecretary">{t('pastSecretary')}</option>
                                                <option value="pastTreasurer">{t('pastTreasurer')}</option>
                                                <option value="pastMembers">{t('pastMembersList')}</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-[#8b0000] mb-1">{t('memberNameEn')}</label>
                                            <input type="text" required value={coreListNameEn} onChange={e => setCoreListNameEn(e.target.value)} className="w-full px-4 py-2 bg-white border border-red-200 text-[#4a0808] placeholder-red-300 rounded focus:ring-2 focus:ring-[#8b0000] focus:bg-white transition-colors" placeholder="e.g. John Doe" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-[#8b0000] mb-1">{t('memberNameMr')}</label>
                                            <input type="text" required value={coreListNameMr} onChange={e => setCoreListNameMr(e.target.value)} className="w-full px-4 py-2 bg-white border border-red-200 text-[#4a0808] placeholder-red-300 rounded focus:ring-2 focus:ring-[#8b0000] focus:bg-white transition-colors" placeholder="e.g. जॉन डो" />
                                        </div>
                                    </div>

                                    {['pastPresident', 'pastVicePresident', 'pastSecretary', 'pastTreasurer'].includes(coreListTarget) && (
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                            <div className="col-span-1 md:col-span-3 lg:col-span-2">
                                                <label className="block text-sm font-semibold text-[#8b0000] mb-2">{lang === 'mr' ? 'फोटो (ऐच्छिक)' : 'Photo (Optional)'}</label>
                                                <div className="flex gap-2 mb-2">
                                                    <button type="button" onClick={() => setCoreListImgMode('upload')} className={`px-3 py-1 text-xs rounded font-medium transition-colors ${coreListImgMode === 'upload' ? 'bg-[#8b0000] text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}>
                                                        📁 {lang === 'mr' ? 'डिव्हाइस वरून अपलोड' : 'Upload from Device'}
                                                    </button>
                                                    <button type="button" onClick={() => setCoreListImgMode('url')} className={`px-3 py-1 text-xs rounded font-medium transition-colors ${coreListImgMode === 'url' ? 'bg-[#8b0000] text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}>
                                                        🔗 {lang === 'mr' ? 'URL पेस्ट करा' : 'Paste URL'}
                                                    </button>
                                                </div>
                                                {coreListImgMode === 'upload' ? (
                                                    <div>
                                                        <input type="file" accept="image/*" ref={coreListImgRef} onChange={e => setCoreListImgFile(e.target.files[0] || null)} className="w-full px-4 py-2 bg-white border border-red-200 text-[#4a0808] rounded focus:ring-2 focus:ring-[#8b0000] transition-colors text-sm" />
                                                        {coreListImgFile && <p className="text-xs text-green-600 mt-1">✓ {coreListImgFile.name}</p>}
                                                    </div>
                                                ) : (
                                                    <input type="url" value={coreListImg} onChange={e => setCoreListImg(e.target.value)} className="w-full px-4 py-2 bg-white border border-red-200 text-[#4a0808] placeholder-red-300 rounded focus:ring-2 focus:ring-[#8b0000] focus:bg-white transition-colors" placeholder="https://..." />
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    <button type="submit" disabled={isAddingCoreMember} className="bg-[#8b0000] text-white px-6 py-2 rounded font-bold hover:bg-[#6b0808] transition-colors disabled:opacity-50">
                                        {isAddingCoreMember ? t('adding') : t('addPastMember')}
                                    </button>
                                    {addCoreMemberStatus && <p className={`text-sm font-medium mt-2 ${addCoreMemberStatus.includes("Error") || addCoreMemberStatus.includes("Failed") ? 'text-red-600' : 'text-green-600'}`}>{addCoreMemberStatus}</p>}
                                </form>
                            </div>

                            {/* Lists */}
                            {coreCommittee && (
                                <div className="space-y-8">
                                    {[
                                        { key: 'pastPresident', title: t('pastPresident') },
                                        { key: 'pastVicePresident', title: t('pastVicePresident') },
                                        { key: 'pastSecretary', title: t('pastSecretary') },
                                        { key: 'pastTreasurer', title: t('pastTreasurer') }
                                    ].map(group => (
                                        <div key={group.key}>
                                            <h3 className="font-semibold text-[#8b0000] mb-3">{group.title}</h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                                {coreCommittee[group.key]?.map(member => (
                                                    <div key={member.id} className="border border-gray-200 rounded p-4 flex justify-between items-center group relative hover:border-red-200">
                                                        <div>
                                                            <p className="font-medium text-gray-800 text-sm">{member.name.en}</p>
                                                            <p className="text-xs text-gray-500">{member.name.mr}</p>
                                                        </div>
                                                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <button onClick={() => openEditModal(group.key, member)} className="text-blue-500 hover:text-blue-700 bg-blue-50 p-1.5 rounded">
                                                                <Edit size={16} />
                                                            </button>
                                                            <button onClick={() => handleDeleteCoreMember(group.key, member.id)} className="text-red-500 hover:text-red-700 bg-red-50 p-1.5 rounded">
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}

                                    {/* Members List */}
                                    <div>
                                        <h3 className="font-semibold text-[#8b0000] mb-3">{t('pastMembersList')}</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                            {coreCommittee.pastMembers?.map(member => (
                                                <div key={member.id} className="bg-gray-50 border border-gray-100 rounded px-3 py-2 flex justify-between items-center group">
                                                    <span className="text-sm font-medium text-gray-700 truncate mr-2" title={member.name.en}>{member.name.en}</span>
                                                    <div className="flex gap-2">
                                                        <button onClick={() => openEditModal('pastMembers', member)} className="text-blue-400 hover:text-blue-600 transition-colors">
                                                            <Edit size={14} />
                                                        </button>
                                                        <button onClick={() => handleDeleteCoreMember('pastMembers', member.id)} className="text-red-400 hover:text-red-600 transition-colors">
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )
                }
                {/* Inventory Management */}
                {
                    activeTab === "inventory" && (
                        <div className="bg-white rounded-xl shadow-lg border border-red-100 p-6 md:p-8 mt-8">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="p-4 rounded-full bg-rose-100 text-rose-600">
                                    <HeartHandshake size={32} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800">{t('inventoryMgmt')}</h2>
                                    <p className="text-gray-500 text-sm mt-1 max-w-md">
                                        {t('inventoryDesc')}
                                    </p>
                                </div>
                            </div>

                            {/* Add/Edit Inventory Form */}
                            <div className="bg-gray-50 p-6 rounded-lg mb-8 border border-gray-200">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-semibold text-[#8b0000]">{editingInvId ? t('updateEquipment') : t('addEquipment')}</h3>
                                    {editingInvId && (
                                        <button onClick={resetInvForm} className="text-sm font-medium text-gray-500 hover:text-gray-800 flex items-center gap-1">
                                            <X size={16} /> {t('cancel')}
                                        </button>
                                    )}
                                </div>
                                <form onSubmit={handleAddInventory} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-semibold text-[#8b0000] mb-1">{t('equipmentType')}</label>
                                            <input type="text" required value={invType} onChange={e => setInvType(e.target.value)} className="w-full px-4 py-2 bg-white border border-red-200 text-[#4a0808] rounded focus:ring-2 focus:ring-[#8b0000] focus:bg-white transition-colors" placeholder="e.g. wheelchair, walker" />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-[#8b0000] mb-1">{t('equipmentTitleEn')}</label>
                                            <input type="text" required value={invTitleEn} onChange={e => setInvTitleEn(e.target.value)} className="w-full px-4 py-2 bg-white border border-red-200 text-[#4a0808] rounded focus:ring-2 focus:ring-[#8b0000] focus:bg-white transition-colors" placeholder="e.g. Wheelchair" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-[#8b0000] mb-1">{t('equipmentTitleMr')}</label>
                                            <input type="text" required value={invTitleMr} onChange={e => setInvTitleMr(e.target.value)} className="w-full px-4 py-2 bg-white border border-red-200 text-[#4a0808] rounded focus:ring-2 focus:ring-[#8b0000] focus:bg-white transition-colors" placeholder="e.g. व्हीलचेअर" />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-semibold text-[#8b0000] mb-1">{t('equipDescEn')}</label>
                                            <textarea rows={2} required value={invDescEn} onChange={e => setInvDescEn(e.target.value)} className="w-full px-4 py-2 bg-white border border-red-200 text-[#4a0808] rounded focus:ring-2 focus:ring-[#8b0000] focus:bg-white transition-colors" placeholder="Short description..."></textarea>
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-semibold text-[#8b0000] mb-1">{t('equipDescMr')}</label>
                                            <textarea rows={2} required value={invDescMr} onChange={e => setInvDescMr(e.target.value)} className="w-full px-4 py-2 bg-white border border-red-200 text-[#4a0808] rounded focus:ring-2 focus:ring-[#8b0000] focus:bg-white transition-colors" placeholder="थोडक्यात माहिती..."></textarea>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-[#8b0000] mb-1">{t('totalUnits')}</label>
                                            <input type="number" required value={invTotalUnits} onChange={e => setInvTotalUnits(e.target.value)} className="w-full px-4 py-2 bg-white border border-red-200 text-[#4a0808] rounded focus:ring-2 focus:ring-[#8b0000] focus:bg-white transition-colors" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-[#8b0000] mb-1">{t('availableUnits')}</label>
                                            <input type="number" required value={invAvailableUnits} onChange={e => setInvAvailableUnits(e.target.value)} className="w-full px-4 py-2 bg-white border border-red-200 text-[#4a0808] rounded focus:ring-2 focus:ring-[#8b0000] focus:bg-white transition-colors" />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-semibold text-[#8b0000] mb-1">{t('equipPhoto')}</label>
                                            <input ref={invPhotoRef} type="file" accept="image/*" onChange={e => setInvPhoto(e.target.files[0])} className="w-full px-4 py-2 bg-white border border-red-200 text-[#4a0808] rounded focus:ring-2 focus:ring-[#8b0000] focus:bg-white transition-colors file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#8b0000] file:text-white hover:file:bg-[#6b0808]" />
                                            {editingInvId && inventoryItems.find(i => i._id === editingInvId)?.imageUrl && !invPhoto && (
                                                <p className="text-xs text-green-600 mt-1">✓ Current photo will be kept unless you upload a new one.</p>
                                            )}
                                        </div>
                                    </div>
                                    <button type="submit" disabled={isSubmittingInv} className="bg-[#8b0000] text-white px-6 py-2 rounded font-bold hover:bg-[#6b0808] transition-colors disabled:opacity-50">
                                        {isSubmittingInv ? t('saving') : (editingInvId ? t('updateEquipment') : t('addEquipment'))}
                                    </button>
                                    {invStatusMsg && <p className={`text-sm font-medium mt-2 ${invStatusMsg.includes("Error") || invStatusMsg.includes("Failed") ? 'text-red-600' : 'text-green-600'}`}>{invStatusMsg}</p>}
                                </form>
                            </div>

                            {/* Inventory List */}
                            <div>
                                <h3 className="font-semibold text-[#8b0000] mb-4">{t('currentEquip')}</h3>
                                {inventoryItems && inventoryItems.length > 0 ? (
                                    <div className="space-y-4">
                                        {inventoryItems.map((inv) => (
                                            <div key={inv._id} className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm flex flex-col md:flex-row justify-between md:items-center p-4">
                                                <div className="flex-1 mb-4 md:mb-0">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="bg-rose-50 text-rose-800 text-xs font-bold uppercase tracking-wide px-2 py-0.5 rounded border border-rose-100">{inv.itemType}</span>
                                                        <h4 className="font-bold text-[#4a0808]">{inv.titleEn}</h4>
                                                    </div>
                                                    <p className="text-sm font-medium text-gray-600 mb-2">{inv.titleMr}</p>
                                                    <div className="flex flex-wrap gap-4 text-xs font-semibold text-gray-700 bg-gray-50 p-2 rounded inline-flex border border-gray-200">
                                                        <span>Total: {inv.totalUnits}</span>
                                                        <span className={inv.availableUnits > 0 ? 'text-green-600' : 'text-red-600'}>Available: {inv.availableUnits}</span>
                                                    </div>
                                                    {inv.imageUrl && (
                                                        <div className="mt-2">
                                                            <img src={`http://localhost:5001${inv.imageUrl}`} alt={inv.titleEn} className="w-24 h-24 object-cover rounded border border-gray-200 shadow-sm" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex flex-col gap-2 self-start md:self-auto min-w-[120px]">
                                                    <button
                                                        onClick={() => handleEditInvClick(inv)}
                                                        className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded transition-colors border border-blue-100 flex items-center justify-center w-full"
                                                        title="Edit"
                                                    >
                                                        <Edit size={16} className="mr-2" />
                                                        <span className="text-sm font-semibold">{t('edit')}</span>
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteInv(inv._id)}
                                                        disabled={isDeletingInv}
                                                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded transition-colors disabled:opacity-50 border border-red-100 flex items-center justify-center w-full"
                                                        title="Delete"
                                                    >
                                                        <Trash2 size={16} className="mr-2" />
                                                        <span className="text-sm font-semibold">{t('delete')}</span>
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-6 bg-gray-50 rounded-lg text-gray-500 border border-gray-200">
                                        {t('noEquipment')}
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                }
            </main>

            {/* Edit Modal Checkout logic */}
            {
                isEditModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                        <div className="bg-white rounded-xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
                            <div className="flex justify-between items-center border-b border-gray-100 p-6">
                                <h3 className="text-xl font-bold text-[#8b0000] flex items-center gap-2">
                                    <Edit size={20} /> {editingMemberGroup === 'coreLeaders' ? t('editLeader') : t('editMember')}
                                </h3>
                                <button onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                                    <X size={24} />
                                </button>
                            </div>
                            <div className="p-6">
                                <form onSubmit={handleEditSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-[#8b0000] mb-1">{t('nameEn')}</label>
                                            <input type="text" required value={editNameEn} onChange={e => setEditNameEn(e.target.value)} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 text-gray-800 rounded focus:ring-2 focus:ring-[#8b0000] focus:bg-white transition-colors" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-[#8b0000] mb-1">{t('nameMr')}</label>
                                            <input type="text" required value={editNameMr} onChange={e => setEditNameMr(e.target.value)} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 text-gray-800 rounded focus:ring-2 focus:ring-[#8b0000] focus:bg-white transition-colors" />
                                        </div>
                                    </div>

                                    {['coreLeaders', 'president', 'vicePresident', 'coVicePresident', 'pastPresident', 'pastVicePresident', 'pastSecretary', 'pastTreasurer'].includes(editingMemberGroup) && (
                                        <>
                                            {editingMemberGroup === 'coreLeaders' && (
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-semibold text-[#8b0000] mb-1">Role (English)</label>
                                                        <input type="text" required value={editRoleEn} onChange={e => setEditRoleEn(e.target.value)} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 text-gray-800 rounded focus:ring-2 focus:ring-[#8b0000] focus:bg-white transition-colors" />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-semibold text-[#8b0000] mb-1">Role (Marathi)</label>
                                                        <input type="text" required value={editRoleMr} onChange={e => setEditRoleMr(e.target.value)} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 text-gray-800 rounded focus:ring-2 focus:ring-[#8b0000] focus:bg-white transition-colors" />
                                                    </div>
                                                </div>
                                            )}
                                            <div>
                                                <label className="block text-sm font-semibold text-[#8b0000] mb-2">{lang === 'mr' ? 'फोटो' : 'Photo'}</label>
                                                <div className="flex gap-2 mb-2">
                                                    <button type="button" onClick={() => setEditImgMode('upload')} className={`px-3 py-1 text-xs rounded font-medium transition-colors ${editImgMode === 'upload' ? 'bg-[#8b0000] text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}>
                                                        📁 {lang === 'mr' ? 'अपलोड' : 'Upload'}
                                                    </button>
                                                    <button type="button" onClick={() => setEditImgMode('url')} className={`px-3 py-1 text-xs rounded font-medium transition-colors ${editImgMode === 'url' ? 'bg-[#8b0000] text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}>
                                                        🔗 {lang === 'mr' ? 'URL' : 'URL'}
                                                    </button>
                                                </div>
                                                {editImgMode === 'upload' ? (
                                                    <div>
                                                        <input type="file" accept="image/*" ref={editImgRef} onChange={e => setEditImgFile(e.target.files[0] || null)} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 text-gray-800 rounded focus:ring-2 focus:ring-[#8b0000] transition-colors text-sm" />
                                                        {editImgFile && <p className="text-xs text-green-600 mt-1">✓ {editImgFile.name}</p>}
                                                    </div>
                                                ) : (
                                                    <input type="url" value={editImg} onChange={e => setEditImg(e.target.value)} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 text-gray-800 rounded focus:ring-2 focus:ring-[#8b0000] focus:bg-white transition-colors" placeholder="https://..." />
                                                )}
                                                {editImg && editImgMode === 'url' && <img src={editImg} alt="Preview" className="mt-2 w-16 h-16 rounded-full object-cover border-2 border-[#8b0000]" />}
                                            </div>
                                        </>
                                    )}

                                    <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-gray-100">
                                        <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-5 py-2 text-gray-600 hover:bg-gray-100 rounded font-medium transition-colors">
                                            {t('cancel')}
                                        </button>
                                        <button type="submit" disabled={isSubmittingEdit} className="bg-[#8b0000] text-white px-6 py-2 rounded font-bold hover:bg-[#6b0808] transition-colors disabled:opacity-50">
                                            {isSubmittingEdit ? t('savingChanges') : t('saveChanges')}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Sub-Committee Edit Modal */}
            {
                isSubEditOpen && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-xl shadow-2xl border border-gray-200 w-full max-w-lg overflow-hidden">
                            <div className="flex items-center justify-between bg-gray-50 px-6 py-4 border-b border-gray-200">
                                <h3 className="text-lg font-bold text-[#8b0000]">{lang === 'mr' ? 'सदस्य संपादन' : 'Edit Member'}</h3>
                                <button onClick={() => setIsSubEditOpen(false)} className="p-1 hover:bg-gray-200 rounded-full transition-colors">
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="p-6">
                                <form onSubmit={handleSubEditSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-[#8b0000] mb-1">{t('nameEn')}</label>
                                            <input type="text" required value={subEditNameEn} onChange={e => setSubEditNameEn(e.target.value)} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 text-gray-800 rounded focus:ring-2 focus:ring-[#8b0000] focus:bg-white transition-colors" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-[#8b0000] mb-1">{t('nameMr')}</label>
                                            <input type="text" required value={subEditNameMr} onChange={e => setSubEditNameMr(e.target.value)} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 text-gray-800 rounded focus:ring-2 focus:ring-[#8b0000] focus:bg-white transition-colors" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-[#8b0000] mb-1">{lang === 'mr' ? 'भूमिका' : 'Role'}</label>
                                        <select value={subEditRole} onChange={e => setSubEditRole(e.target.value)} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 text-gray-800 rounded focus:ring-2 focus:ring-[#8b0000] focus:bg-white transition-colors">
                                            <option value="">{lang === 'mr' ? 'सदस्य (सामान्य)' : 'Member (Regular)'}</option>
                                            <option value="head">{lang === 'mr' ? 'प्रमुख (Head)' : 'Head (प्रमुख)'}</option>
                                            <option value="jt-head">{lang === 'mr' ? 'सह-प्रमुख (Jt. Head)' : 'Jt. Head (सह-प्रमुख)'}</option>
                                        </select>
                                    </div>
                                    <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
                                        <button type="button" onClick={() => setIsSubEditOpen(false)} className="px-5 py-2 text-gray-600 hover:bg-gray-100 rounded font-medium transition-colors">
                                            {t('cancel')}
                                        </button>
                                        <button type="submit" disabled={isSubmittingSubEdit} className="bg-[#8b0000] text-white px-6 py-2 rounded font-bold hover:bg-[#6b0808] transition-colors disabled:opacity-50">
                                            {isSubmittingSubEdit ? (lang === 'mr' ? 'जतन करत आहे...' : 'Saving...') : (lang === 'mr' ? 'बदल जतन करा' : 'Save Changes')}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )
            }


        </div >
    );
}
