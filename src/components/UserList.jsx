import { useState, useEffect } from 'react';
import UserDetail from './UserDetail';
import UserForm from './UserForm';
import ActionModal from './ActionModal';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('checking');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);
  
  // API base URL with fallback
  const API_URL = 'http://localhost:5000/api/users';
  
  // Check server connection
  useEffect(() => {
    const checkServerConnection = async () => {
      try {
        const response = await fetch('http://localhost:5000/');
        if (response.ok) {
          console.log('เซิร์ฟเวอร์กำลังทำงาน');
          setConnectionStatus('connected');
        } else {
          setConnectionStatus('error');
          setError('เซิร์ฟเวอร์กำลังทำงาน แต่ส่งค่าผิดพลาด');
        }
      } catch (err) {
        console.error('การเชื่อมต่อเซิร์ฟเวอร์ผิดพลาด:', err);
        setConnectionStatus('disconnected');
        setError('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาตรวจสอบว่าเซิร์ฟเวอร์กำลังทำงานที่พอร์ต 5000');
      }
    };
    
    checkServerConnection();
  }, []);
  
  // Fetch users on component mount or when connection status changes
  useEffect(() => {
    if (connectionStatus === 'connected') {
      fetchUsers();
    }
  }, [connectionStatus]);
  
  const fetchUsers = async () => {
    setLoading(true);
    try {
      console.log('กำลังดึงข้อมูลผู้ใช้จาก:', API_URL);
      const response = await fetch(API_URL);
      
      if (!response.ok) {
        throw new Error(`ผิดพลาด ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('ดึงข้อมูลผู้ใช้สำเร็จ:', data.length);
      setUsers(data);
      setError(null);
    } catch (err) {
      console.error('การดึงข้อมูลผิดพลาด:', err);
      setError(err.message || 'ไม่สามารถดึงข้อมูลผู้ใช้ได้');
    } finally {
      setLoading(false);
    }
  };
  
  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setShowDetailModal(true);
  };
  
  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };
  
  const handleShowActionModal = (user) => {
    setSelectedUser(user);
    setShowActionModal(true);
  };
  
  const handleDeleteUser = async (userId) => {
    if (window.confirm('คุณแน่ใจหรือไม่ที่จะลบผู้ใช้นี้?')) {
      try {
        const response = await fetch(`${API_URL}/${userId}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`การลบล้มเหลว: ${response.statusText} - ${errorText}`);
        }
        
        // Update UI after successful deletion
        setUsers(users.filter(user => user._id !== userId));
      } catch (err) {
        console.error('การลบผิดพลาด:', err);
        setError(err.message);
      }
    }
  };
  
  const handleSaveUser = () => {
    fetchUsers();
    setShowAddModal(false);
    setShowEditModal(false);
  };

  return (
    <div className="user-list-container">
      <h2>ระบบจัดการผู้ใช้งาน</h2>
      
      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={fetchUsers}>ลองใหม่</button>
        </div>
      )}
      
      <div className="button-container">
        <button 
          className="add-user-btn"
          onClick={() => setShowAddModal(true)}
        >
          เพิ่มผู้ใช้งานใหม่
        </button>
      </div>
      
      {loading ? (
        <div className="loading">กำลังโหลดข้อมูลผู้ใช้...</div>
      ) : (
        <table className="user-table">
          <thead>
            <tr>
              <th>ชื่อ</th>
              <th>ข้อมูล</th>
              <th>อีเมล</th>
              <th>เพศ</th>
              <th>เบอร์โทรศัพท์</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map(user => (
                <tr key={user._id}>
                  <td>
                    <a href="#" onClick={() => handleUserSelect(user)}>
                      {user.name}
                    </a>
                  </td>
                  <td>
                    <button className="action-icon" onClick={() => handleShowActionModal(user)}>
                      <i className="file-icon">📁</i>
                    </button>
                  </td>
                  <td>{user.email}</td>
                  <td>{user.sex || 'ไม่ระบุ'}</td>
                  <td>{user.phone || 'ไม่ระบุ'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center' }}>
                  ไม่พบข้อมูลผู้ใช้
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
      
      {showDetailModal && selectedUser && (
        <UserDetail 
          user={selectedUser}
          apiUrl={API_URL}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedUser(null);
          }}
        />
      )}
      
      {showAddModal && (
        <UserForm 
          apiUrl={API_URL}
          onSave={handleSaveUser}
          onCancel={() => setShowAddModal(false)}
        />
      )}
      
      {showEditModal && selectedUser && (
        <UserForm 
          user={selectedUser}
          apiUrl={API_URL}
          onSave={handleSaveUser}
          onCancel={() => {
            setShowEditModal(false);
            setSelectedUser(null);
          }}
        />
      )}

      {showActionModal && selectedUser && (
        <ActionModal
          user={selectedUser}
          apiUrl={API_URL}
          onEdit={() => {
            setShowActionModal(false);
            handleEditUser(selectedUser);
          }}
          onDelete={() => {
            setShowActionModal(false);
            handleDeleteUser(selectedUser._id);
          }}
          onClose={() => {
            setShowActionModal(false);
            setSelectedUser(null);
          }}
        />
      )}
    </div>
  );
}

export default UserList;
