import { GalleryVerticalEnd } from "lucide-react"


import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Link, Navigate, useLocation, useNavigate } from "react-router"
import { useState } from "react"
import { useAuth } from "@/auth/AuthContext"


export default function LoginPage() {
  const { login, loading, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10 bg-[url('/img/img-auth-bg.jpg')] bg-cover">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">

        </a>
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader className="text-center">
              <div className="flex size-6 items-center justify-center m-auto w-auto h-auto">
                <svg className="w-24 d-block mx-auto mb-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
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
              </div>
              <CardTitle className="text-xl">Thiên An Phú</CardTitle>
              <CardDescription>
                Chào mừng quay trở lại
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Alert hiển thị lỗi đăng nhập hoặc validate */}
              {error && (
                <div className="text-alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleLogin}>
                <FieldGroup>
                  <Field>
                    <Input
                      id="username"
                      type="text"
                      placeholder="Tên đăng nhập"
                      required
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Field>
                  {/* Hiển thị lỗi dưới input nếu có */}
                  {error && !/^([a-zA-Z0-9]{4,8})$/.test(username) && (
                    <div className="invalid-feedback d-block text-alert">
                      Tên đăng nhập phải từ 4-8 ký tự, chỉ gồm chữ cái và số.
                    </div>
                  )}
                  <Field>
                    <Input
                      placeholder="Mật khẩu"
                      id="password"
                      type="password"
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Field>

                  {error && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+=,./;'[\\]<>:\"{}]).{8,}$/.test(password) && (
                    <div className="invalid-feedback d-block text-alert">
                      Mật khẩu phải từ 8 ký tự, có chữ hoa, chữ thường và ký tự đặc biệt.
                    </div>
                  )}
                  <Field>
                    <Button type="submit" disabled={loading}>{loading ? 'Đang đăng nhập...' : 'Đăng nhập'}</Button>
                  </Field>
                </FieldGroup>

                <FieldDescription className="p-6 text-center">
                  <div className="text-sm text-muted-foreground flex items-center justify-center gap-5">
                    <Link to="/terms">Terms of Service</Link>
                    <Link to="/privacy">Privacy Policy</Link>
                  </div>
                </FieldDescription>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}