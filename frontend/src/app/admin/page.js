"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Radio, ShieldCheck, Image as ImageIcon, Trash2, Users, Star, Crown, Edit, X, Calendar, Clock, MapPin } from "lucide-react";

export default function AdminPage() {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
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
    const [isAddingMember, setIsAddingMember] = useState(false);
    const [addMemberStatus, setAddMemberStatus] = useState("");
    const [isDeletingMember, setIsDeletingMember] = useState(false);

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
    const [isSubmittingEvent, setIsSubmittingEvent] = useState(false);
    const [eventStatusMsg, setEventStatusMsg] = useState("");
    const [isDeletingEvent, setIsDeletingEvent] = useState(false);

    // Fetch initial status
    useEffect(() => {
        if (!isAuthenticated) return;
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

        fetch(`${API_URL}/live-status`)
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
    }, [isAuthenticated]);

    const fetchGallery = async () => {
        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const res = await fetch(`${API_URL}/gallery`, { cache: "no-store", next: { revalidate: 0 } });
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
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const res = await fetch(`${API_URL}/sub-committee`, { cache: "no-store", next: { revalidate: 0 } });
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
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const res = await fetch(`${API_URL}/core-committee`, { cache: "no-store", next: { revalidate: 0 } });
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
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const res = await fetch(`${API_URL}/events`, { cache: "no-store", next: { revalidate: 0 } });
            const data = await res.json();
            if (Array.isArray(data)) {
                setEvents(data);
            }
        } catch (err) {
            console.error("Failed to fetch events", err);
        }
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
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const newStatus = !isLive;
            const res = await fetch(`${API_URL}/live-status`, {
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
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const res = await fetch(`${API_URL}/gallery`, {
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
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const res = await fetch(`${API_URL}/gallery?id=${id}`, { method: 'DELETE' });
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
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const res = await fetch(`${API_URL}/sub-committee`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    subCommitteeId: selectedSubCommittee,
                    nameEn: memberNameEn,
                    nameMr: memberNameMr
                })
            });
            const data = await res.json();
            if (data.success) {
                setAddMemberStatus("Member added successfully!");
                setMemberNameEn("");
                setMemberNameMr("");
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

    const handleAddSubCommittee = async (e) => {
        e.preventDefault();
        setIsAddingSub(true);
        setAddSubStatus("Creating sub-committee...");

        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const res = await fetch(`${API_URL}/sub-committee`, {
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
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const res = await fetch(`${API_URL}/sub-committee?subCommitteeId=${subCommitteeId}&memberId=${memberId}`, { method: 'DELETE' });
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

    const handleAddCoreMember = async (e) => {
        e.preventDefault();
        if (!coreListNameEn || !coreListNameMr) return;
        setIsAddingCoreMember(true);
        setAddCoreMemberStatus("");

        try {
            const payloadData = { nameEn: coreListNameEn, nameMr: coreListNameMr };
            if (coreListTarget === "coreLeaders") {
                payloadData.roleEn = coreListRoleEn;
                payloadData.roleMr = coreListRoleMr;
                payloadData.img = coreListImg;
            }

            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const res = await fetch(`${API_URL}/core-committee`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    group: coreListTarget,
                    action: "add-member",
                    data: payloadData
                })
            });
            const data = await res.json();
            if (data.success) {
                setAddCoreMemberStatus("Member added successfully!");
                setCoreListNameEn("");
                setCoreListNameMr("");
                setCoreListRoleEn("");
                setCoreListRoleMr("");
                setCoreListImg("");
                fetchCoreCommittee(); // Refresh data
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
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const res = await fetch(`${API_URL}/core-committee?group=${group}&id=${memberId}`, { method: 'DELETE' });
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
        if (group === "coreLeaders" && member.role) {
            setEditRoleEn(member.role.en || "");
            setEditRoleMr(member.role.mr || "");
            setEditImg(member.img || "");
        } else {
            setEditRoleEn("");
            setEditRoleMr("");
            setEditImg("");
        }
        setIsEditModalOpen(true);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        if (!editNameEn || !editNameMr) return;
        setIsSubmittingEdit(true);

        try {
            const payloadData = { id: editingMemberId, nameEn: editNameEn, nameMr: editNameMr };
            if (editingMemberGroup === "coreLeaders") {
                payloadData.roleEn = editRoleEn;
                payloadData.roleMr = editRoleMr;
                payloadData.img = editImg;
            }

            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const res = await fetch(`${API_URL}/core-committee`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    group: editingMemberGroup,
                    action: "edit-member",
                    data: payloadData
                })
            });
            const data = await res.json();
            if (data.success) {
                fetchCoreCommittee(); // refresh
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

            const eventData = {
                ...(editingEventId ? { id: editingEventId } : {}),
                title: { en: eventTitleEn, mr: eventTitleMr },
                date: { en: formattedDateEn, mr: formattedDateMr },
                time: { en: formattedTimeEn, mr: formattedTimeMr },
                dateRaw: eventDate,
                timeRaw: eventTime,
                loc: { en: eventLocEn, mr: eventLocMr },
                desc: { en: eventDescEn, mr: eventDescMr },
                type: eventType
            };

            const action = editingEventId ? "edit-event" : "add-event";

            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const res = await fetch(`${API_URL}/events`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action, eventData })
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
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDeleteEvent = async (id) => {
        if (!confirm("Are you sure you want to delete this event?")) return;
        setIsDeletingEvent(true);
        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const res = await fetch(`${API_URL}/events?id=${id}`, { method: 'DELETE' });
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
            <div className="min-h-screen bg-[#fffdfc] flex items-center justify-center p-6">
                <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-2xl border border-gray-100 max-w-md w-full text-center space-y-6">
                    <ShieldCheck size={48} className="mx-auto text-[#8b0000]" />
                    <h1 className="text-2xl font-bold font-serif text-[#4a0808]">Admin Access</h1>
                    <p className="text-gray-500 text-sm">Please enter the admin password to continue.</p>

                    <div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 bg-red-50 border border-red-200 text-[#4a0808] placeholder-red-300 rounded focus:outline-none focus:ring-2 focus:ring-[#8b0000] focus:bg-white transition-colors"
                            placeholder="Enter Admin Password"
                        />
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    </div>

                    <button type="submit" className="w-full bg-[#8b0000] text-white py-2 rounded font-bold hover:bg-[#a50d0d] transition-colors">
                        Login
                    </button>
                    <p className="text-xs text-gray-400 mt-4">(Default hint: admin123)</p>
                </form>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fef5f5] font-sans">
            {/* Header */}
            <header className="bg-[#4a0808] text-[#fceabb] py-6 px-6 shadow-md border-b-4 border-[#be1111] flex justify-between items-center">
                <div>
                    <h1 className="text-xl md:text-2xl font-bold font-serif">Mandal Admin Control</h1>
                    <p className="text-sm opacity-80">Manage website features</p>
                </div>
                <Link href="/" className="flex items-center gap-2 hover:text-white transition-colors text-sm font-semibold">
                    <ArrowLeft size={16} /> Back to Site
                </Link>
            </header>

            {/* Dashboard Content */}
            <main className="max-w-4xl mx-auto p-6 mt-8 space-y-8">

                <div className="bg-white rounded-xl shadow-lg border border-red-100 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-start gap-4">
                        <div className={`p-4 rounded-full ${isLive ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-500'}`}>
                            <Radio size={32} className={isLive ? "animate-pulse" : ""} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">Live Stream Visibility</h2>
                            <p className="text-gray-500 text-sm mt-1 max-w-md">
                                Toggle this to show or hide the "Live Stream" button in the bottom left corner of the main website. Turn this on only when a live event is actively happening.
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
                            {isLive ? 'Currently Live' : 'Hidden'}
                        </span>
                    </div>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded text-sm text-yellow-800">
                    <strong>Note:</strong> This live status uses a local file to temporarily save state. In a production environment (like Vercel), this may reset to default on server restart. For permanent storage, connecting a database is recommended.
                </div>

                {/* Tab Navigation Menu */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                        onClick={() => setActiveTab("core-committee")}
                        className={`p-4 rounded-xl border text-left flex items-center gap-3 transition-all ${activeTab === "core-committee" ? 'bg-[#8b0000] border-[#8b0000] text-white shadow-md' : 'bg-white border-red-100 text-[#4a0808] hover:border-red-300 hover:shadow-sm'
                            }`}
                    >
                        <Crown size={24} className={activeTab === "core-committee" ? 'text-[#fceabb]' : 'text-[#8b0000]'} />
                        <span className="font-bold">Core Committee</span>
                    </button>
                    <button
                        onClick={() => setActiveTab("sub-committee")}
                        className={`p-4 rounded-xl border text-left flex items-center gap-3 transition-all ${activeTab === "sub-committee" ? 'bg-[#8b0000] border-[#8b0000] text-white shadow-md' : 'bg-white border-red-100 text-[#4a0808] hover:border-red-300 hover:shadow-sm'
                            }`}
                    >
                        <Users size={24} className={activeTab === "sub-committee" ? 'text-[#fceabb]' : 'text-[#8b0000]'} />
                        <span className="font-bold">Sub-Committees</span>
                    </button>
                    <button
                        onClick={() => setActiveTab("gallery")}
                        className={`p-4 rounded-xl border text-left flex items-center gap-3 transition-all ${activeTab === "gallery" ? 'bg-[#8b0000] border-[#8b0000] text-white shadow-md' : 'bg-white border-red-100 text-[#4a0808] hover:border-red-300 hover:shadow-sm'
                            }`}
                    >
                        <ImageIcon size={24} className={activeTab === "gallery" ? 'text-[#fceabb]' : 'text-[#8b0000]'} />
                        <span className="font-bold">Photo Gallery</span>
                    </button>
                    <button
                        onClick={() => setActiveTab("events")}
                        className={`p-4 rounded-xl border text-left flex items-center gap-3 transition-all ${activeTab === "events" ? 'bg-[#8b0000] border-[#8b0000] text-white shadow-md' : 'bg-white border-red-100 text-[#4a0808] hover:border-red-300 hover:shadow-sm'
                            }`}
                    >
                        <Calendar size={24} className={activeTab === "events" ? 'text-[#fceabb]' : 'text-[#8b0000]'} />
                        <span className="font-bold">Upcoming Events</span>
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
                                    <h2 className="text-xl font-bold text-gray-800">Upload to Photo Gallery</h2>
                                    <p className="text-gray-500 text-sm mt-1 max-w-md">
                                        Add a new memory to the gallery. The newest photos will automatically appear at the top.
                                    </p>
                                </div>
                            </div>
                            <form onSubmit={handleUpload} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-[#8b0000] mb-1">Image File</label>
                                    <input ref={fileInputRef} type="file" required accept="image/*" onChange={e => setUploadFile(e.target.files[0])} className="w-full px-4 py-2 bg-red-50 border border-red-200 text-[#4a0808] rounded focus:ring-2 focus:ring-[#8b0000] focus:bg-white transition-colors file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#8b0000] file:text-white hover:file:bg-[#6b0808]" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-[#8b0000] mb-1">Year</label>
                                        <input type="number" required value={uploadYear} onChange={e => setUploadYear(e.target.value)} className="w-full px-4 py-2 bg-red-50 border border-red-200 text-[#4a0808] placeholder-red-300 rounded focus:ring-2 focus:ring-[#8b0000] focus:bg-white transition-colors" placeholder="e.g. 2024" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-[#8b0000] mb-1">Caption (English)</label>
                                        <input type="text" required value={uploadAltEn} onChange={e => setUploadAltEn(e.target.value)} className="w-full px-4 py-2 bg-red-50 border border-red-200 text-[#4a0808] placeholder-red-300 rounded focus:ring-2 focus:ring-[#8b0000] focus:bg-white transition-colors" placeholder="e.g. Ganpati 2024" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-[#8b0000] mb-1">Caption (Marathi)</label>
                                        <input type="text" required value={uploadAltMr} onChange={e => setUploadAltMr(e.target.value)} className="w-full px-4 py-2 bg-red-50 border border-red-200 text-[#4a0808] placeholder-red-300 rounded focus:ring-2 focus:ring-[#8b0000] focus:bg-white transition-colors" placeholder="e.g. गणपती २०२४" />
                                    </div>
                                </div>
                                <button type="submit" disabled={isUploading} className="bg-[#8b0000] text-white px-6 py-2 rounded font-bold hover:bg-[#6b0808] transition-colors disabled:opacity-50">
                                    {isUploading ? "Uploading..." : "Upload Photo"}
                                </button>
                                {uploadStatus && <p className={`text-sm font-medium mt-2 ${uploadStatus.includes("Error") || uploadStatus.includes("Failed") ? 'text-red-600' : 'text-green-600'}`}>{uploadStatus}</p>}
                            </form>
                        </div>

                        {/* Gallery History List */}
                        <div className="bg-white rounded-xl shadow-lg border border-red-100 p-6 md:p-8 mt-8">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-gray-800">Uploaded Photos ({galleryItems.length})</h2>
                                <button
                                    onClick={() => setShowHistory(!showHistory)}
                                    className="text-sm font-semibold border-2 border-[#8b0000] text-[#8b0000] hover:bg-[#8b0000] hover:text-white px-4 py-1.5 rounded-full transition-colors"
                                >
                                    {showHistory ? "Hide History" : "Show History"}
                                </button>
                            </div>

                            {showHistory && (
                                <>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="border-b-2 border-red-100 text-[#8b0000] text-sm">
                                                    <th className="pb-3 px-2">Image</th>
                                                    <th className="pb-3 px-2">Year</th>
                                                    <th className="pb-3 px-2">Caption (English / Marathi)</th>
                                                    <th className="pb-3 px-2 text-right">Action</th>
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
                                                        <td colSpan="4" className="py-8 text-center text-gray-500 italic">No photos uploaded yet.</td>
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
                                                Show More Photos
                                            </button>
                                        )}
                                        {visibleCount > 5 && (
                                            <button
                                                onClick={() => setVisibleCount(5)}
                                                className="text-sm font-semibold border-2 border-gray-300 text-gray-600 hover:bg-gray-100 px-6 py-2 rounded-full transition-colors"
                                            >
                                                Show Less
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
                                <h2 className="text-xl font-bold text-gray-800">Manage Upcoming Events</h2>
                                <p className="text-gray-500 text-sm mt-1 max-w-md">
                                    Add, edit, or remove the events displayed on the homepage.
                                </p>
                            </div>
                        </div>

                        {/* Add/Edit Event Form */}
                        <div className="bg-gray-50 p-6 rounded-lg mb-8 border border-gray-200">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold text-[#8b0000]">{editingEventId ? "Edit Event" : "Add New Event"}</h3>
                                {editingEventId && (
                                    <button onClick={resetEventForm} className="text-sm font-medium text-gray-500 hover:text-gray-800 flex items-center gap-1">
                                        <X size={16} /> Cancel Edit
                                    </button>
                                )}
                            </div>
                            <form onSubmit={handleAddEvent} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-[#8b0000] mb-1">Event Title (English)</label>
                                        <input type="text" required value={eventTitleEn} onChange={e => setEventTitleEn(e.target.value)} className="w-full px-4 py-2 bg-white border border-red-200 text-[#4a0808] rounded focus:ring-2 focus:ring-[#8b0000] focus:bg-white transition-colors" placeholder="e.g. Ganeshotsav 2026 Preparations" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-[#8b0000] mb-1">Event Title (Marathi)</label>
                                        <input type="text" required value={eventTitleMr} onChange={e => setEventTitleMr(e.target.value)} className="w-full px-4 py-2 bg-white border border-red-200 text-[#4a0808] rounded focus:ring-2 focus:ring-[#8b0000] focus:bg-white transition-colors" placeholder="e.g. गणेशोत्सव २०२६ पूर्वतयारी" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-[#8b0000] mb-1">Event Pick Date</label>
                                        <input type="date" required value={eventDate} onChange={e => setEventDate(e.target.value)} onClick={(e) => e.target.showPicker()} className="w-full px-4 py-2 bg-white border border-red-200 text-[#4a0808] rounded focus:ring-2 focus:ring-[#8b0000] focus:bg-white transition-colors cursor-pointer" />
                                        <p className="text-xs text-gray-500 mt-1">Date displays will be automatically localized.</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-[#8b0000] mb-1">Event Pick Time (Optional)</label>
                                        <input type="time" value={eventTime} onChange={e => setEventTime(e.target.value)} onClick={(e) => e.target.showPicker()} className="w-full px-4 py-2 bg-white border border-red-200 text-[#4a0808] rounded focus:ring-2 focus:ring-[#8b0000] focus:bg-white transition-colors cursor-pointer" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-[#8b0000] mb-1">Location (English)</label>
                                        <input type="text" value={eventLocEn} onChange={e => setEventLocEn(e.target.value)} className="w-full px-4 py-2 bg-white border border-red-200 text-[#4a0808] rounded focus:ring-2 focus:ring-[#8b0000] focus:bg-white transition-colors" placeholder="e.g. Mandal Karyalay" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-[#8b0000] mb-1">Location (Marathi)</label>
                                        <input type="text" value={eventLocMr} onChange={e => setEventLocMr(e.target.value)} className="w-full px-4 py-2 bg-white border border-red-200 text-[#4a0808] rounded focus:ring-2 focus:ring-[#8b0000] focus:bg-white transition-colors" placeholder="e.g. मंडळ कार्यालय" />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-semibold text-[#8b0000] mb-1">Event Type/Category</label>
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
                                        <label className="block text-sm font-semibold text-[#8b0000] mb-1">Description (English)</label>
                                        <textarea rows={2} value={eventDescEn} onChange={e => setEventDescEn(e.target.value)} className="w-full px-4 py-2 bg-white border border-red-200 text-[#4a0808] rounded focus:ring-2 focus:ring-[#8b0000] focus:bg-white transition-colors" placeholder="Short details about the event..."></textarea>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-semibold text-[#8b0000] mb-1">Description (Marathi)</label>
                                        <textarea rows={2} value={eventDescMr} onChange={e => setEventDescMr(e.target.value)} className="w-full px-4 py-2 bg-white border border-red-200 text-[#4a0808] rounded focus:ring-2 focus:ring-[#8b0000] focus:bg-white transition-colors" placeholder="कार्यक्रमाची थोडक्यात माहिती..."></textarea>
                                    </div>
                                </div>
                                <button type="submit" disabled={isSubmittingEvent} className="bg-[#8b0000] text-white px-6 py-2 rounded font-bold hover:bg-[#6b0808] transition-colors disabled:opacity-50">
                                    {isSubmittingEvent ? (editingEventId ? "Saving..." : "Adding...") : (editingEventId ? "Update Event" : "Add Event")}
                                </button>
                                {eventStatusMsg && <p className={`text-sm font-medium mt-2 ${eventStatusMsg.includes("Error") || eventStatusMsg.includes("Failed") ? 'text-red-600' : 'text-green-600'}`}>{eventStatusMsg}</p>}
                            </form>
                        </div>

                        {/* Events List */}
                        <div>
                            <h3 className="font-semibold text-[#8b0000] mb-4">Current Registered Events</h3>
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
                                            </div>
                                            <div className="flex flex-col gap-2 self-start md:self-auto min-w-[120px]">
                                                <button
                                                    onClick={() => handleEditEventClick(ev)}
                                                    className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded transition-colors border border-blue-100 flex items-center justify-center w-full"
                                                    title="Edit Event"
                                                >
                                                    <Edit size={16} className="mr-2" />
                                                    <span className="text-sm font-semibold">Edit</span>
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteEvent(ev.id)}
                                                    disabled={isDeletingEvent}
                                                    className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded transition-colors disabled:opacity-50 border border-red-100 flex items-center justify-center w-full"
                                                    title="Delete Event"
                                                >
                                                    <Trash2 size={16} className="mr-2" />
                                                    <span className="text-sm font-semibold">Delete</span>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-6 bg-gray-50 rounded-lg text-gray-500 border border-gray-200">
                                    No upcoming events active. Add some events using the form above.
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Sub-Committee Management */}
                {activeTab === "sub-committee" && (
                    <div className="bg-white rounded-xl shadow-lg border border-red-100 p-6 md:p-8 mt-8">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="p-4 rounded-full bg-purple-100 text-purple-600">
                                <Users size={32} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">Sub-Committee Management</h2>
                                <p className="text-gray-500 text-sm mt-1 max-w-md">
                                    Add or remove members from various sub-committees. Changes will be instantly visible on the public Committee page.
                                </p>
                            </div>
                        </div>

                        {/* Create New Sub-Committee Form */}
                        <div className="bg-gray-50 p-6 rounded-lg mb-8 border border-gray-200">
                            <h3 className="font-semibold text-[#8b0000] mb-4">Create New Sub-Committee</h3>
                            <form onSubmit={handleAddSubCommittee} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-[#8b0000] mb-1">Committee Name (English)</label>
                                        <input type="text" required value={newSubTitleEn} onChange={e => setNewSubTitleEn(e.target.value)} className="w-full px-4 py-2 bg-white border border-red-200 text-[#4a0808] placeholder-red-300 rounded focus:ring-2 focus:ring-[#8b0000] focus:bg-white transition-colors" placeholder="e.g. Decoration Committee" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-[#8b0000] mb-1">Committee Name (Marathi)</label>
                                        <input type="text" required value={newSubTitleMr} onChange={e => setNewSubTitleMr(e.target.value)} className="w-full px-4 py-2 bg-white border border-red-200 text-[#4a0808] placeholder-red-300 rounded focus:ring-2 focus:ring-[#8b0000] focus:bg-white transition-colors" placeholder="e.g. सजावट समिती" />
                                    </div>
                                </div>
                                <button type="submit" disabled={isAddingSub} className="bg-[#8b0000] text-white px-6 py-2 rounded font-bold hover:bg-[#6b0808] transition-colors disabled:opacity-50">
                                    {isAddingSub ? "Creating..." : "Create Committee"}
                                </button>
                                {addSubStatus && <p className={`text-sm font-medium mt-2 ${addSubStatus.includes("Error") || addSubStatus.includes("Failed") ? 'text-red-600' : 'text-green-600'}`}>{addSubStatus}</p>}
                            </form>
                        </div>

                        {/* Add Member Form */}
                        <div className="bg-gray-50 p-6 rounded-lg mb-8 border border-gray-200">
                            <h3 className="font-semibold text-[#8b0000] mb-4">Add New Member</h3>
                            <form onSubmit={handleAddMember} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-[#8b0000] mb-1">Select Sub-Committee</label>
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
                                        <label className="block text-sm font-semibold text-[#8b0000] mb-1">Member Name (English)</label>
                                        <input type="text" required value={memberNameEn} onChange={e => setMemberNameEn(e.target.value)} className="w-full px-4 py-2 bg-white border border-red-200 text-[#4a0808] placeholder-red-300 rounded focus:ring-2 focus:ring-[#8b0000] focus:bg-white transition-colors" placeholder="e.g. John Doe" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-[#8b0000] mb-1">Member Name (Marathi)</label>
                                        <input type="text" required value={memberNameMr} onChange={e => setMemberNameMr(e.target.value)} className="w-full px-4 py-2 bg-white border border-red-200 text-[#4a0808] placeholder-red-300 rounded focus:ring-2 focus:ring-[#8b0000] focus:bg-white transition-colors" placeholder="e.g. जॉन डो" />
                                    </div>
                                </div>
                                <button type="submit" disabled={isAddingMember} className="bg-[#8b0000] text-white px-6 py-2 rounded font-bold hover:bg-[#6b0808] transition-colors disabled:opacity-50">
                                    {isAddingMember ? "Adding..." : "Add Member"}
                                </button>
                                {addMemberStatus && <p className={`text-sm font-medium mt-2 ${addMemberStatus.includes("Error") || addMemberStatus.includes("Failed") ? 'text-red-600' : 'text-green-600'}`}>{addMemberStatus}</p>}
                            </form>
                        </div>

                        {/* Manage Members List */}
                        <div>
                            <h3 className="font-semibold text-[#8b0000] mb-4">Current Members</h3>
                            {subCommittees && subCommittees.length > 0 ? (
                                <div className="space-y-6">
                                    {subCommittees.map((sub) => (
                                        <div key={sub.id} className="border border-gray-200 rounded-lg overflow-hidden">
                                            <div className="bg-gray-100 px-4 py-3 font-semibold text-gray-800 border-b border-gray-200 flex justify-between items-center">
                                                <span>{sub.title.en} <span className="text-gray-500 font-normal text-sm">({sub.title.mr})</span></span>
                                                <span className="text-sm bg-white px-2 py-0.5 rounded-full border border-gray-300 text-gray-600">{sub.members ? sub.members.length : 0} Members</span>
                                            </div>
                                            <ul className="divide-y divide-gray-100">
                                                {sub.members && sub.members.length > 0 ? (
                                                    sub.members.map((member) => (
                                                        <li key={member.id} className="p-4 flex justify-between items-center hover:bg-red-50/50 transition-colors">
                                                            <div>
                                                                <p className="font-medium text-gray-800">{member.name.en}</p>
                                                                <p className="text-sm text-gray-500">{member.name.mr}</p>
                                                            </div>
                                                            <button
                                                                onClick={() => handleDeleteMember(sub.id, member.id)}
                                                                disabled={isDeletingMember}
                                                                className="text-red-500 hover:text-red-700 hover:bg-red-100 p-2 rounded transition-colors disabled:opacity-50"
                                                                title="Remove Member"
                                                            >
                                                                <Trash2 size={20} />
                                                            </button>
                                                        </li>
                                                    ))
                                                ) : (
                                                    <li className="p-4 text-center text-gray-500 italic text-sm">No members added yet.</li>
                                                )}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-6 text-gray-500 italic">Loading sub-committees...</div>
                            )}
                        </div>
                    </div>
                )}

                {/* Core Committee Management */}
                {activeTab === "core-committee" && (
                    <div className="bg-white rounded-xl shadow-lg border border-red-100 p-6 md:p-8 mt-8">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="p-4 rounded-full bg-amber-100 text-amber-600">
                                <Crown size={32} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">Core Committee Management</h2>
                                <p className="text-gray-500 text-sm mt-1 max-w-md">
                                    Update the top leadership and core members dynamically.
                                </p>
                            </div>
                        </div>

                        {/* Add List Member Form */}
                        <div className="bg-gray-50 p-6 rounded-lg mb-8 border border-gray-200">
                            <h3 className="font-semibold text-[#8b0000] mb-4 flex items-center gap-2"><Users size={18} /> Add General Core Member</h3>
                            <form onSubmit={handleAddCoreMember} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-[#8b0000] mb-1">Select Group</label>
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
                                        <label className="block text-sm font-semibold text-[#8b0000] mb-1">Member Name (English)</label>
                                        <input type="text" required value={coreListNameEn} onChange={e => setCoreListNameEn(e.target.value)} className="w-full px-4 py-2 bg-white border border-red-200 text-[#4a0808] placeholder-red-300 rounded focus:ring-2 focus:ring-[#8b0000] focus:bg-white transition-colors" placeholder="e.g. John Doe" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-[#8b0000] mb-1">Member Name (Marathi)</label>
                                        <input type="text" required value={coreListNameMr} onChange={e => setCoreListNameMr(e.target.value)} className="w-full px-4 py-2 bg-white border border-red-200 text-[#4a0808] placeholder-red-300 rounded focus:ring-2 focus:ring-[#8b0000] focus:bg-white transition-colors" placeholder="e.g. जॉन डो" />
                                    </div>
                                </div>

                                {/* Extra fields for Top Roles */}
                                {['coreLeaders', 'president', 'vicePresident', 'coVicePresident'].includes(coreListTarget) && (
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                        <div className="col-span-1 md:col-span-3 lg:col-span-2">
                                            <label className="block text-sm font-semibold text-[#8b0000] mb-1">Image URL (Optional for Leaders)</label>
                                            <input type="url" value={coreListImg} onChange={e => setCoreListImg(e.target.value)} className="w-full px-4 py-2 bg-white border border-red-200 text-[#4a0808] placeholder-red-300 rounded focus:ring-2 focus:ring-[#8b0000] focus:bg-white transition-colors" placeholder="https://..." />
                                        </div>
                                        {coreListTarget === "coreLeaders" && (
                                            <>
                                                <div>
                                                    <label className="block text-sm font-semibold text-[#8b0000] mb-1">Role (English)</label>
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
                                                    <label className="block text-sm font-semibold text-[#8b0000] mb-1">Role (Marathi)</label>
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
                                    {isAddingCoreMember ? "Adding..." : "Add Member"}
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
                                    <h3 className="font-semibold text-[#8b0000] mb-3">Core Leaders</h3>
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
                                    <h3 className="font-semibold text-[#8b0000] mb-3">Advisory Board</h3>
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
                                    <h3 className="font-semibold text-[#8b0000] mb-3">Working Members</h3>
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
                )}
            </main>

            {/* Edit Modal Checkout logic */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center border-b border-gray-100 p-6">
                            <h3 className="text-xl font-bold text-[#8b0000] flex items-center gap-2">
                                <Edit size={20} /> Edit {editingMemberGroup === 'coreLeaders' ? 'Leader' : 'Member'}
                            </h3>
                            <button onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="p-6">
                            <form onSubmit={handleEditSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-[#8b0000] mb-1">Name (English)</label>
                                        <input type="text" required value={editNameEn} onChange={e => setEditNameEn(e.target.value)} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 text-gray-800 rounded focus:ring-2 focus:ring-[#8b0000] focus:bg-white transition-colors" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-[#8b0000] mb-1">Name (Marathi)</label>
                                        <input type="text" required value={editNameMr} onChange={e => setEditNameMr(e.target.value)} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 text-gray-800 rounded focus:ring-2 focus:ring-[#8b0000] focus:bg-white transition-colors" />
                                    </div>
                                </div>

                                {editingMemberGroup === 'coreLeaders' && (
                                    <>
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
                                        <div>
                                            <label className="block text-sm font-semibold text-[#8b0000] mb-1">Image URL</label>
                                            <input type="url" value={editImg} onChange={e => setEditImg(e.target.value)} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 text-gray-800 rounded focus:ring-2 focus:ring-[#8b0000] focus:bg-white transition-colors" />
                                        </div>
                                    </>
                                )}

                                <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-gray-100">
                                    <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-5 py-2 text-gray-600 hover:bg-gray-100 rounded font-medium transition-colors">
                                        Cancel
                                    </button>
                                    <button type="submit" disabled={isSubmittingEdit} className="bg-[#8b0000] text-white px-6 py-2 rounded font-bold hover:bg-[#6b0808] transition-colors disabled:opacity-50">
                                        {isSubmittingEdit ? "Saving..." : "Save Changes"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
