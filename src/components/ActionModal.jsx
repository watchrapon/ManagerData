import { useEffect, useState } from 'react';
import '../styles/Modal.css';

function ActionModal({ user, onEdit, onDelete, onClose, apiUrl }) {
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
      <div className="modal-content user-action-modal">
        <div className="modal-header">
          <h2>จัดการข้อมูลผู้ใช้</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          {loading && <div className="loading-indicator">กำลังโหลดข้อมูลผู้ใช้...</div>}
          {error && <div className="error">{error}</div>}
          
          {userData && (
            <div className="user-data-container">
              <div className="user-details">
                <h3>ข้อมูลผู้ใช้</h3>
                
                <div className="user-detail-item">
                  <span className="detail-label">ชื่อ:</span>
                  <span className="detail-value">{userData.name}</span>
                </div>
                
                <div className="user-detail-item">
                  <span className="detail-label">อีเมล:</span>
                  <span className="detail-value">{userData.email}</span>
                </div>
                
                <div className="user-detail-item">
                  <span className="detail-label">เพศ:</span>
                  <span className="detail-value muted-text">{userData.sex || 'ไม่ระบุ'}</span>
                </div>
                
                <div className="user-detail-item">
                  <span className="detail-label">เบอร์โทรศัพท์:</span>
                  <span className="detail-value">{userData.phone || 'ไม่ระบุ'}</span>
                </div>
                
                <div className="user-detail-item">
                  <span className="detail-label">ที่อยู่:</span>
                  <span className="detail-value address">{userData.address || 'ไม่ระบุ'}</span>
                </div>
                
                {userData.created_at && (
                  <div className="user-detail-item">
                    <span className="detail-label">สร้างเมื่อ:</span>
                    <span className="detail-value">{new Date(userData.created_at).toLocaleString('th-TH')}</span>
                  </div>
                )}
                
                {userData.updated_at && (
                  <div className="user-detail-item">
                    <span className="detail-label">แก้ไขล่าสุด:</span>
                    <span className="detail-value">{new Date(userData.updated_at).toLocaleString('th-TH')}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        <div className="modal-footer action-buttons">
          <button className="edit-btn" onClick={onEdit} disabled={loading}>
            <span className="action-icon">✏️</span> แก้ไขข้อมูล
          </button>
          <button className="delete-btn" onClick={onDelete} disabled={loading}>
            <span className="action-icon">🗑️</span> ลบข้อมูล
          </button>
          <button className="close-action-btn" onClick={onClose}>ปิด</button>
        </div>
      </div>
    </div>
  );
}

export default ActionModal;
