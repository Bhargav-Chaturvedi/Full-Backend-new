import { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Trash2, Edit, Plus } from 'lucide-react';

const Contacts = () => {
    const [contacts, setContacts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentContact, setCurrentContact] = useState({ Name: '', Email: '', Phone: '' });
    const [isEditing, setIsEditing] = useState(false);

    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const fetchContacts = async () => {
        try {
            const res = await axiosClient.get('/contacts');
            setContacts(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure?")) {
            try {
                await axiosClient.delete(`/contacts/${id}`);
                setContacts(contacts.filter(c => c._id !== id));
            } catch (err) {
                console.error("Failed to delete", err);
            }
        }
    };

    const handleEdit = (contact) => {
        setCurrentContact(contact);
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const handleAddNew = () => {
        setCurrentContact({ Name: '', Email: '', Phone: '' });
        setIsEditing(false);
        setIsModalOpen(true);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                const res = await axiosClient.put(`/contacts/${currentContact._id}`, currentContact);
                setContacts(contacts.map(c => c._id === currentContact._id ? res.data : c));
            } else {
                const res = await axiosClient.post('/contacts', currentContact);
                setContacts([...contacts, res.data]);
            }
            setIsModalOpen(false);
        } catch (err) {
            console.error("Failed to save", err);
            alert(err.response?.data?.message || "Error saving contact");
        }
    };

    return (

        <div className="min-h-screen">
            <nav className="border-b border-white/10 bg-black/20 backdrop-blur-md sticky top-0 z-40">
                <div className="container px-6 py-4 mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="bg-indigo-600 p-2 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                        </div>
                        <h1 className="text-xl font-bold text-white tracking-wide">ContactFlow</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-gray-300 hidden md:block">Welcome, <span className="text-white font-medium">{user?.username}</span></span>
                        <button onClick={logout} className="px-4 py-2 text-sm font-medium text-red-200 border border-red-500/30 rounded-lg hover:bg-red-500/10 transition-colors">Logout</button>
                    </div>
                </div>
            </nav>

            <main className="container px-6 py-8 mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div>
                        <h2 className="text-3xl font-bold text-white">Contacts</h2>
                        <p className="text-gray-400 mt-1">Manage all your connections in one place</p>
                    </div>
                    <button onClick={handleAddNew} className="btn-primary flex items-center gap-2 !w-auto">
                        <Plus size={20} /> New Contact
                    </button>
                </div>

                {contacts.length === 0 ? (
                    <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
                        <div className="bg-white/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Plus size={32} className="text-gray-500" />
                        </div>
                        <h3 className="text-xl font-medium text-white">No contacts yet</h3>
                        <p className="text-gray-400 mt-2 mb-6">Start building your network by adding your first contact.</p>
                        <button onClick={handleAddNew} className="btn-secondary">
                            Add Contact
                        </button>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {contacts.map((contact) => (
                            <div key={contact._id} className="group p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                                        {contact.Name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => handleEdit(contact)} className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                                            <Edit size={16} />
                                        </button>
                                        <button onClick={() => handleDelete(contact._id)} className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-1">{contact.Name}</h3>
                                <div className="space-y-2 mt-4">
                                    <div className="flex items-center text-sm text-gray-400">
                                        <svg className="w-4 h-4 mr-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                        {contact.Email}
                                    </div>
                                    <div className="flex items-center text-sm text-gray-400">
                                        <svg className="w-4 h-4 mr-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                        {contact.Phone}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
                    <div className="w-full max-w-md p-8 bg-[#1e1e24] border border-white/10 rounded-2xl shadow-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-white">{isEditing ? 'Edit Contact' : 'Add New Contact'}</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>
                        <form onSubmit={handleFormSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    value={currentContact.Name}
                                    onChange={(e) => setCurrentContact({ ...currentContact, Name: e.target.value })}
                                    className="input-field bg-black/20"
                                    placeholder="Enter full name"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    value={currentContact.Email}
                                    onChange={(e) => setCurrentContact({ ...currentContact, Email: e.target.value })}
                                    className="input-field bg-black/20"
                                    placeholder="email@example.com"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Phone Number</label>
                                <input
                                    type="text"
                                    value={currentContact.Phone}
                                    onChange={(e) => setCurrentContact({ ...currentContact, Phone: e.target.value })}
                                    className="input-field bg-black/20"
                                    placeholder="+1 (555) 000-0000"
                                    required
                                />
                            </div>
                            <div className="flex gap-3 mt-8">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-3 w-full text-gray-300 font-medium bg-white/5 hover:bg-white/10 rounded-lg transition-colors">Cancel</button>
                                <button type="submit" className="btn-primary w-full shadow-none">{isEditing ? 'Save Changes' : 'Create Contact'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Contacts;
