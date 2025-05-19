import { useState, useEffect } from 'react';
import '../styles/Modal.css';

function UserForm({ user, apiUrl, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    sex: '',
    phone: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // If editing an existing user, populate the form
  useEffect(() => {
    if (user) {
      setFormData({
        name: '',  // ให้เริ่มเป็นค่าว่างเพื่อแสดง placeholder
        email: '', // ให้เริ่มเป็นค่าว่างเพื่อแสดง placeholder
        password: '', 
        address: '', // ให้เริ่มเป็นค่าว่างเพื่อแสดง placeholder
        sex: user.sex || '', // กรณีเพศให้เลือกค่าเริ่มต้นตามข้อมูลเดิม
        phone: '' // ให้เริ่มเป็นค่าว่างเพื่อแสดง placeholder
      });
    }
  }, [user]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      let url = apiUrl;
      let method = 'POST';
      
      // If we're editing, use PUT and include the ID in the URL
      if (user && user._id) {
        url = `${url}/${user._id}`;
        method = 'PUT';
      }
      
      // Don't send empty password when editing
      const dataToSend = { ...formData };
      if (user && user._id && !dataToSend.password) {
        delete dataToSend.password;
      }
      
      console.log(`คำขอ ${method} ไปยัง ${url}`);
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(dataToSend),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('ข้อผิดพลาดจาก API:', errorText);
        throw new Error(`บันทึกข้อมูลผู้ใช้ไม่สำเร็จ: ${response.statusText}`);
      }
      
      // Call the onSave callback to refresh the user list
      onSave();
      
    } catch (err) {
      console.error('ข้อผิดพลาดในการบันทึกข้อมูลผู้ใช้:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{user ? 'แก้ไขข้อมูลผู้ใช้' : 'เพิ่มผู้ใช้ใหม่'}</h2>
          <button className="close-btn" onClick={onCancel}>×</button>
        </div>
        
        <div className="modal-body">
          {error && <p className="error">{error}</p>}
          
          <form onSubmit={handleSubmit} className="form-layout">
            <div className="form-group">
              <label htmlFor="name">ชื่อ</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={user?.name || "กรุณากรอกชื่อ"}
                required
                className={user ? "has-placeholder" : ""}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">อีเมล</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={user?.email || "example@email.com"}
                required
                className={user ? "has-placeholder" : ""}
              />
            </div>
            
            {/* แสดงช่องรหัสผ่านเฉพาะเมื่อเป็นการเพิ่มผู้ใช้ใหม่เท่านั้น */}
            {!user && (
              <div className="form-group">
                <label htmlFor="password">รหัสผ่าน</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="กรุณากรอกรหัสผ่าน"
                  required
                />
              </div>
            )}
            
            <div className="form-group">
              <label htmlFor="sex">เพศ</label>
              <select
                id="sex"
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                className={formData.sex ? "sex-select selected-value" : "sex-select empty-select"}
              >
                <option value="" className="placeholder-option">กรุณาเลือกเพศ</option>
                <option value="ชาย">ชาย</option>
                <option value="หญิง">หญิง</option>
                <option value="อื่นๆ">อื่นๆ</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="phone">เบอร์โทรศัพท์</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder={user?.phone || "กรุณากรอกเบอร์โทรศัพท์"}
                className={user?.phone ? "has-placeholder" : ""}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="address">ที่อยู่</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
                placeholder={user?.address || "กรุณากรอกที่อยู่"}
                className={user?.address ? "has-placeholder" : ""}
              />
            </div>
            
            <div className="form-actions">
              <button type="submit" className="save-btn" disabled={loading}>
                {loading ? 'กำลังบันทึก...' : 'บันทึก'}
              </button>
              <button type="button" className="cancel-btn" onClick={onCancel} disabled={loading}>ยกเลิก</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserForm;
