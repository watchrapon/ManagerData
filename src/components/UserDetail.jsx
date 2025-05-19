import { useEffect, useState } from 'react';
import '../styles/Modal.css';

function UserDetail({ user, apiUrl, onClose }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        console.log(`กำลังดึงข้อมูลผู้ใช้ ID: ${user._id}`);
        const response = await fetch(`${apiUrl}/${user._id}`);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('API ส่งข้อความผิดพลาด:', errorText);
          throw new Error(`การดึงข้อมูลผู้ใช้ล้มเหลว: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('ดึงข้อมูลผู้ใช้สำเร็จ:', data);
        setUserData(data);
      } catch (err) {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    if (user && user._id) {
      fetchUserDetails();
    } else {
      setError("ข้อมูลผู้ใช้ไม่ถูกต้อง");
      setLoading(false);
    }
  }, [user, apiUrl]);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>ข้อมูลผู้ใช้</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          {loading && <p>กำลังโหลดข้อมูลผู้ใช้...</p>}
          {error && <p className="error">ข้อผิดพลาด: {error}</p>}
          
          {userData && (
            <div className="user-details">
              <p><strong>ชื่อ:</strong> {userData.name}</p>
              <p><strong>อีเมล:</strong> {userData.email}</p>
              <p><strong>เพศ:</strong> {userData.sex || 'ไม่ระบุ'}</p>
              <p><strong>เบอร์โทรศัพท์:</strong> {userData.phone || 'ไม่ระบุ'}</p>
              <p><strong>ที่อยู่:</strong> {userData.address || 'ไม่ระบุ'}</p>
              
              {/* Format dates if available */}
              {userData.created_at && (
                <p><strong>สร้างเมื่อ:</strong> {new Date(userData.created_at).toLocaleString('th-TH')}</p>
              )}
              {userData.updated_at && (
                <p><strong>แก้ไขล่าสุด:</strong> {new Date(userData.updated_at).toLocaleString('th-TH')}</p>
              )}
            </div>
          )}
        </div>
        
        <div className="modal-footer">
          <button onClick={onClose}>ปิด</button>
        </div>
      </div>
    </div>
  );
}

export default UserDetail;
