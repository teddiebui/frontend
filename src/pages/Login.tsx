
import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router';
import { useAuth } from '@/auth/AuthContext';

function Login() {
  const { login, loading, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const redirectTo =
    (location.state as { from?: { pathname?: string } } | null)?.from?.pathname || '/';

  if (loading) {
    return null;
  }

  if (!loading && user) {
    return <Navigate to={redirectTo} replace />;
  }

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    setError(null);

    const result = await login(username, password);
    if (result.ok) {
      navigate(redirectTo, { replace: true });
    } else {
      setError(result.message || 'Đăng nhập thất bại');
    }
  };

  return (
    <>
      <div className="login-body">
        <div className="login-box d-flex align-items-center justify-content-center">
          <div className="wrapper w-100">
            <div className="text-center mb-4">
              {/* SVG Logo giữ nguyên */}
              <svg className="mx-auto mb-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
                <path fill="#6446fe" d="M59,8H5A1,1,0,0,0,4,9V55a1,1,0,0,0,1,1H59a1,1,0,0,0,1-1V9A1,1,0,0,0,59,8ZM58,54H6V10H58Z" className="color1d1f47 svgShape"></path>
                <path fill="#6446fe" d="M36,35H28a3,3,0,0,1-3-3V27a3,3,0,0,1,3-3h8a3,3,0,0,1,3,3v5A3,3,0,0,1,36,35Zm-8-9a1,1,0,0,0-1,1v5a1,1,0,0,0,1,1h8a1,1,0,0,0,1-1V27a1,1,0,0,0-1-1Z" className="color0055ff svgShape"></path>
                <path fill="#6446fe" d="M36 26H28a1 1 0 0 1-1-1V24a5 5 0 0 1 10 0v1A1 1 0 0 1 36 26zm-7-2h6a3 3 0 0 0-6 0zM32 31a1 1 0 0 1-1-1V29a1 1 0 0 1 2 0v1A1 1 0 0 1 32 31z" className="color0055ff svgShape"></path>
                <path fill="#6446fe" d="M59 8H5A1 1 0 0 0 4 9v8a1 1 0 0 0 1 1H20.08a1 1 0 0 0 .63-.22L25.36 14H59a1 1 0 0 0 1-1V9A1 1 0 0 0 59 8zm-1 4H25l-.21 0a1.09 1.09 0 0 0-.42.2L19.73 16H6V10H58zM50 49H14a1 1 0 0 1-1-1V39a1 1 0 0 1 1-1H50a1 1 0 0 1 1 1v9A1 1 0 0 1 50 49zM15 47H49V40H15z" className="color1d1f47 svgShape"></path>
                <circle cx="19.5" cy="43.5" r="1.5" fill="#6446fe" className="color0055ff svgShape"></circle>
                <circle cx="24.5" cy="43.5" r="1.5" fill="#6446fe" className="color0055ff svgShape"></circle>
                <circle cx="29.5" cy="43.5" r="1.5" fill="#6446fe" className="color0055ff svgShape"></circle>
                <circle cx="34.5" cy="43.5" r="1.5" fill="#6446fe" className="color0055ff svgShape"></circle>
                <circle cx="39.5" cy="43.5" r="1.5" fill="#6446fe" className="color0055ff svgShape"></circle>
                <circle cx="44.5" cy="43.5" r="1.5" fill="#6446fe" className="color0055ff svgShape"></circle>
                <path fill="#6446fe" d="M60 9a1 1 0 0 0-1-1H28.81l2.37-2.37A19.22 19.22 0 0 1 60 31zM35.19 56l-2.37 2.37A19.22 19.22 0 0 1 4 33V55a1 1 0 0 0 1 1z" opacity=".3" className="color0055ff svgShape"></path>
              </svg>
              <div className="logo mb-2">Thiên An Phú</div>
              <div className="subtitle mb-2">Chào mừng quay trở lại</div>
            </div>

            {/* Alert hiển thị lỗi đăng nhập hoặc validate */}
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            <form className="" onSubmit={handleLogin}>
              <div className="mb-4">
                <input
                  type="text"
                  className={`form-control${error && !/^([a-zA-Z0-9]{4,8})$/.test(username) ? ' is-invalid' : ''}`}
                  id="username"
                  name="username"
                  placeholder="Tên đăng nhập"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  autoComplete="username"
                  autoFocus
                />
                {/* Hiển thị lỗi dưới input nếu có */}
                {error && !/^([a-zA-Z0-9]{4,8})$/.test(username) && (
                  <div className="invalid-feedback d-block" style={{ fontSize: 13 }}>
                    Tên đăng nhập phải từ 4-8 ký tự, chỉ gồm chữ cái và số.
                  </div>
                )}
              </div>

              <div className="mb-4 position-relative">
                <div className="position-relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className={`form-control${error && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+=,./;'[\\]<>:\"{}]).{8,}$/.test(password) ? ' is-invalid' : ''}`}
                    id="password"
                    name="password"
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    autoComplete="current-password"
                  />
                  {/* Nút hiện/ẩn password */}
                  <i
                    id="show-password"
                    className="bi bi-eye"
                    style={{ display: showPassword ? 'none' : 'block', position: 'absolute', top: '50%', right: 0, transform: 'translate(-50%, -50%)', color: '#979797', cursor: 'pointer' }}
                    onClick={() => setShowPassword(true)}
                    aria-label="Hiện mật khẩu"
                    tabIndex={0}
                  ></i>
                  <i
                    id="hide-password"
                    className="bi bi-eye-slash"
                    style={{ display: showPassword ? 'block' : 'none', position: 'absolute', top: '50%', right: 0, transform: 'translate(-50%, -50%)', color: '#979797', cursor: 'pointer' }}
                    onClick={() => setShowPassword(false)}
                    aria-label="Ẩn mật khẩu"
                    tabIndex={0}
                  ></i>
                </div>
                {error && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+=,./;'[\\]<>:\"{}]).{8,}$/.test(password) && (
                  <div className="invalid-feedback d-block" style={{ fontSize: 13 }}>
                    Mật khẩu phải từ 8 ký tự, có chữ hoa, chữ thường và ký tự đặc biệt.
                  </div>
                )}
              </div>

              <div className="d-flex flex-row mb-4 justify-content-between">
                <div className="remember-me">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    className="me-2"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                  />
                  <span>Ghi nhớ</span>
                </div>
                <div className="forgot-password">
                  <button type="button" className="forgot-password-link" tabIndex={-1}>Quên mật khẩu?</button>
                </div>
              </div>

              <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
              </button>
            </form>
          </div>

          <div className="d-flex flex-row justify-content-center documentation position-absolute bottom-0 mb-3">
            <a href="/term-of-service" className="text-muted me-2"><span>Điều khoản dịch vụ</span></a>
            <a href="/privacy-policy" className="text-muted"><span>Quyền riêng tư</span></a>
          </div>
        </div>
      </div>
      {/* CSS nội bộ cho login page */}
      <style>{`
        .login-body {
          background: url("/img/img-auth-bg.jpg") no-repeat center fixed;
          background-size: cover;
          width: 100%;
          height: 100vh;
        }
        .login-box {
          width: 400px;
          height: 600px;
          background: white;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
          transform: translate(-50%, -50%);
          position: fixed;
          top: 50%;
          left: 50%;
        }
        .wrapper.w-100 {
          width: 100%;
        }
        .logo {
          font-weight: 600;
          font-size: 1.8rem;
          color: #2c3e50;
        }
        .subtitle {
          font-size: 14px;
          color: #98a5c3;
        }
        .alert {
          font-size: 0.9rem;
        }
        .is-invalid {
          border-color: #dc3545 !important;
        }
        #show-password,
        #hide-password {
          display: none;
          position: absolute;
          top: 50%;
          right: 0;
          transform: translate(-50%, -50%);
          color: #979797;
        }
        #show-password {
          display: block;
        }
        input[type=text],
        input[type=password] {
          font-size: 15px;
          color: #494949;
          border: 1px solid #dbe0e5;
          padding: 10px 15px;
          width: 100%;
          border-radius: 8px;
          transition: all 0.3s;
        }
        input::placeholder {
          color: #c4cacf;
        }
        input:focus,
        input:hover {
          border: 1px solid #6c7a88;
          outline: none;
        }
        i#show-password,
        i#hide-password {
          font-size: 18px;
          transition: all 0.5s;
        }
        i#show-password:hover,
        i#hide-password:hover {
          color: #343434;
        }
        .documentation {
          font-size: 16px;
        }
        .forgot-password-link {
          border: none;
          background: transparent;
          color: inherit;
          padding: 0;
        }
        a {
          text-decoration: none !important;
        }
        svg {
          width: 85px;
        }
      `}</style>
    </>
  );
}

export default Login;