import AxiosInstance from "../../http/AxiosInstance";

export const requestOTP = async (phoneNumber) => {
    try {
        console.log('Bắt đầu gửi yêu cầu OTP cho số:', phoneNumber);
        // Gọi đến Axios instance đã được cấu hình
        const response = await AxiosInstance().post('/api/auth/register', {
            phone: phoneNumber,
        });
        return response;
    } catch (error) {
        // Ném lỗi ra ngoài để component có thể bắt và xử lý
        console.error('Lỗi khi yêu cầu OTP:', error.response?.data || error.message);
        throw error;
    }
}

export async function verifyOtp(phoneNumber, code) {
    try {
        // gọi API
        const response = await AxiosInstance().post('/api/auth/verify-register', {
            phone: phoneNumber,
            code: code,
        });
        // Nếu thành công, trả về dữ liệu
        return response;
    } catch (error) {
        // Nếu thất bại, lấy thông báo lỗi và NÉM nó ra
        const errorMessage = error.response?.data?.message || 'Mã OTP không hợp lệ hoặc đã hết hạn.';
        throw new Error(errorMessage);
    }
}

export async function requestLoginOtp(phoneNumber) {
    try {
        console.log('Bắt đầu gửi yêu cầu OTP đăng nhập cho số:', phoneNumber);
        // Gọi đến endpoint /api/auth/login
        const response = await AxiosInstance().post('/api/auth/login', {
            phone: phoneNumber,
        });
        return response;
    } catch (error) {
        const errorMessage = error.response?.data?.error || 'Số điện thoại chưa được đăng ký.';
        console.error('Lỗi khi yêu cầu OTP đăng nhập:', error.response?.data || error.message);
        throw new Error(errorMessage);
    }
}

export async function verifyLoginOtp(phoneNumber, code) {
    try {
        const response = await AxiosInstance().post('/api/auth/verify-login', {
            phone: phoneNumber,
            code: code,
        });
        // Nếu thành công, response sẽ chứa token và thông tin user
        return response;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Mã OTP không hợp lệ.';
        console.error('Lỗi khi xác thực OTP đăng nhập:', error.response?.data || error.message);
        throw new Error(errorMessage);
    }
}

export async function getProfile() {
    try {
        const response = await AxiosInstance().get('/api/user/profile');
        return response;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Không thể tải thông tin cá nhân.';
        throw new Error(errorMessage);
    }
}

export async function updateProfile(profileData) {
    try {
        const response = await AxiosInstance().put('/api/user/profile', profileData);
        return response;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Cập nhật thông tin thất bại.';
        throw new Error(errorMessage);
    }
}