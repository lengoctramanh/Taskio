# Taskio API MVP

## 1. Thong tin chung

- Ten du an: Taskio
- Muc tieu: Thiet ke danh sach API MVP cho ung dung quan ly cong viec.
- Base URL du kien khi chay local: `http://localhost:3000`
- Dinh dang du lieu: JSON
- Xac thuc: cac API quyen `User` va `Admin` gui token trong header:

```http
Authorization: Bearer <access_token>
```

## 2. Quy uoc phan quyen

| Quyen truy cap | Mo ta |
| --- | --- |
| Public | Khong can dang nhap |
| User | Can dang nhap |
| Admin | Can dang nhap va co role admin |

## 3. Danh sach API MVP

| Nhom API | Method | Endpoint | Chuc nang | Quyen |
| --- | --- | --- | --- | --- |
| Auth | POST | `/api/auth/register` | Dang ky tai khoan | Public |
| Auth | POST | `/api/auth/login` | Dang nhap | Public |
| Auth | GET | `/api/auth/me` | Lay thong tin nguoi dung hien tai | User |
| User | GET | `/api/users/profile` | Xem ho so ca nhan | User |
| User | PUT | `/api/users/profile` | Cap nhat ho so ca nhan | User |
| Board | POST | `/api/boards` | Tao bang cong viec | User |
| Board | GET | `/api/boards` | Lay danh sach bang cua nguoi dung | User |
| Board | GET | `/api/boards/:id` | Xem chi tiet bang | User |
| Board | PUT | `/api/boards/:id` | Cap nhat bang | User |
| Board | DELETE | `/api/boards/:id` | Xoa bang | User |
| List | POST | `/api/lists` | Tao danh sach cong viec | User |
| List | PUT | `/api/lists/:id` | Cap nhat danh sach | User |
| List | DELETE | `/api/lists/:id` | Xoa danh sach | User |
| Card | POST | `/api/cards` | Tao the cong viec | User |
| Card | PUT | `/api/cards/:id` | Cap nhat the cong viec | User |
| Card | DELETE | `/api/cards/:id` | Xoa the cong viec | User |
| Admin | GET | `/api/admin/users` | Xem danh sach nguoi dung | Admin |
| Admin | PUT | `/api/admin/users/:id/status` | Khoa hoac mo khoa nguoi dung | Admin |
| Admin | PUT | `/api/admin/users/:id/role` | Cap nhat role nguoi dung | Admin |

## 4. Chi tiet API

### 4.1. Auth API

#### POST `/api/auth/register`

- Chuc nang: Dang ky tai khoan moi.
- Quyen truy cap: Public.
- Du lieu gui len:

```json
{
  "name": "Nguyen Van A",
  "email": "vana@example.com",
  "password": "123456"
}
```

- Du lieu tra ve du kien:

```json
{
  "message": "Dang ky thanh cong",
  "user": {
    "id": "user_id",
    "name": "Nguyen Van A",
    "email": "vana@example.com",
    "role": "user",
    "status": "active"
  }
}
```

#### POST `/api/auth/login`

- Chuc nang: Dang nhap vao he thong.
- Quyen truy cap: Public.
- Du lieu gui len:

```json
{
  "email": "vana@example.com",
  "password": "123456"
}
```

- Du lieu tra ve du kien:

```json
{
  "message": "Dang nhap thanh cong",
  "accessToken": "jwt_access_token",
  "user": {
    "id": "user_id",
    "name": "Nguyen Van A",
    "email": "vana@example.com",
    "role": "user"
  }
}
```

#### GET `/api/auth/me`

- Chuc nang: Lay thong tin nguoi dung dang dang nhap.
- Quyen truy cap: User.
- Du lieu gui len: Khong co body, can gui `Authorization` header.
- Du lieu tra ve du kien:

```json
{
  "user": {
    "id": "user_id",
    "name": "Nguyen Van A",
    "email": "vana@example.com",
    "role": "user",
    "status": "active"
  }
}
```

### 4.2. User API

#### GET `/api/users/profile`

- Chuc nang: Xem ho so ca nhan.
- Quyen truy cap: User.
- Du lieu gui len: Khong co body, can gui `Authorization` header.
- Du lieu tra ve du kien:

```json
{
  "profile": {
    "id": "user_id",
    "name": "Nguyen Van A",
    "email": "vana@example.com",
    "avatar": "https://example.com/avatar.png",
    "createdAt": "2026-09-19T00:00:00.000Z"
  }
}
```

#### PUT `/api/users/profile`

- Chuc nang: Cap nhat ho so ca nhan.
- Quyen truy cap: User.
- Du lieu gui len:

```json
{
  "name": "Nguyen Van B",
  "avatar": "https://example.com/avatar-new.png"
}
```

- Du lieu tra ve du kien:

```json
{
  "message": "Cap nhat ho so thanh cong",
  "profile": {
    "id": "user_id",
    "name": "Nguyen Van B",
    "email": "vana@example.com",
    "avatar": "https://example.com/avatar-new.png"
  }
}
```

### 4.3. Board API

#### POST `/api/boards`

- Chuc nang: Tao bang cong viec moi.
- Quyen truy cap: User.
- Du lieu gui len:

```json
{
  "title": "Du an Taskio",
  "description": "Bang quan ly cong viec cho nhom"
}
```

- Du lieu tra ve du kien:

```json
{
  "message": "Tao bang thanh cong",
  "board": {
    "id": "board_id",
    "title": "Du an Taskio",
    "description": "Bang quan ly cong viec cho nhom",
    "ownerId": "user_id"
  }
}
```

#### GET `/api/boards`

- Chuc nang: Lay danh sach bang cua nguoi dung.
- Quyen truy cap: User.
- Du lieu gui len: Khong co body.
- Du lieu tra ve du kien:

```json
{
  "boards": [
    {
      "id": "board_id",
      "title": "Du an Taskio",
      "description": "Bang quan ly cong viec cho nhom",
      "ownerId": "user_id"
    }
  ]
}
```

#### GET `/api/boards/:id`

- Chuc nang: Xem chi tiet mot bang cong viec.
- Quyen truy cap: User.
- Du lieu gui len: `id` nam tren URL.
- Du lieu tra ve du kien:

```json
{
  "board": {
    "id": "board_id",
    "title": "Du an Taskio",
    "description": "Bang quan ly cong viec cho nhom",
    "lists": [
      {
        "id": "list_id",
        "title": "Can lam",
        "cards": []
      }
    ]
  }
}
```

#### PUT `/api/boards/:id`

- Chuc nang: Cap nhat thong tin bang.
- Quyen truy cap: User.
- Du lieu gui len:

```json
{
  "title": "Du an Taskio MVP",
  "description": "Cap nhat mo ta bang cong viec"
}
```

- Du lieu tra ve du kien:

```json
{
  "message": "Cap nhat bang thanh cong",
  "board": {
    "id": "board_id",
    "title": "Du an Taskio MVP",
    "description": "Cap nhat mo ta bang cong viec"
  }
}
```

#### DELETE `/api/boards/:id`

- Chuc nang: Xoa bang cong viec.
- Quyen truy cap: User.
- Du lieu gui len: `id` nam tren URL.
- Du lieu tra ve du kien:

```json
{
  "message": "Xoa bang thanh cong"
}
```

### 4.4. List API

#### POST `/api/lists`

- Chuc nang: Tao danh sach cong viec trong bang.
- Quyen truy cap: User.
- Du lieu gui len:

```json
{
  "boardId": "board_id",
  "title": "Can lam",
  "position": 1
}
```

- Du lieu tra ve du kien:

```json
{
  "message": "Tao danh sach thanh cong",
  "list": {
    "id": "list_id",
    "boardId": "board_id",
    "title": "Can lam",
    "position": 1
  }
}
```

#### PUT `/api/lists/:id`

- Chuc nang: Cap nhat danh sach cong viec.
- Quyen truy cap: User.
- Du lieu gui len:

```json
{
  "title": "Dang lam",
  "position": 2
}
```

- Du lieu tra ve du kien:

```json
{
  "message": "Cap nhat danh sach thanh cong",
  "list": {
    "id": "list_id",
    "title": "Dang lam",
    "position": 2
  }
}
```

#### DELETE `/api/lists/:id`

- Chuc nang: Xoa danh sach cong viec.
- Quyen truy cap: User.
- Du lieu gui len: `id` nam tren URL.
- Du lieu tra ve du kien:

```json
{
  "message": "Xoa danh sach thanh cong"
}
```

### 4.5. Card API

#### POST `/api/cards`

- Chuc nang: Tao the cong viec.
- Quyen truy cap: User.
- Du lieu gui len:

```json
{
  "listId": "list_id",
  "title": "Thiet ke API MVP",
  "description": "Lap danh sach API va mo ta request response",
  "dueDate": "2026-09-30",
  "position": 1
}
```

- Du lieu tra ve du kien:

```json
{
  "message": "Tao the thanh cong",
  "card": {
    "id": "card_id",
    "listId": "list_id",
    "title": "Thiet ke API MVP",
    "description": "Lap danh sach API va mo ta request response",
    "status": "todo",
    "dueDate": "2026-09-30",
    "position": 1
  }
}
```

#### PUT `/api/cards/:id`

- Chuc nang: Cap nhat the cong viec.
- Quyen truy cap: User.
- Du lieu gui len:

```json
{
  "title": "Hoan thien API MVP",
  "description": "Bo sung quyen truy cap va response",
  "status": "doing",
  "dueDate": "2026-09-30",
  "listId": "list_id",
  "position": 2
}
```

- Du lieu tra ve du kien:

```json
{
  "message": "Cap nhat the thanh cong",
  "card": {
    "id": "card_id",
    "title": "Hoan thien API MVP",
    "description": "Bo sung quyen truy cap va response",
    "status": "doing",
    "dueDate": "2026-09-30",
    "listId": "list_id",
    "position": 2
  }
}
```

#### DELETE `/api/cards/:id`

- Chuc nang: Xoa the cong viec.
- Quyen truy cap: User.
- Du lieu gui len: `id` nam tren URL.
- Du lieu tra ve du kien:

```json
{
  "message": "Xoa the thanh cong"
}
```

### 4.6. Admin API

#### GET `/api/admin/users`

- Chuc nang: Xem danh sach nguoi dung trong he thong.
- Quyen truy cap: Admin.
- Du lieu gui len: Khong co body.
- Du lieu tra ve du kien:

```json
{
  "users": [
    {
      "id": "user_id",
      "name": "Nguyen Van A",
      "email": "vana@example.com",
      "role": "user",
      "status": "active"
    }
  ]
}
```

#### PUT `/api/admin/users/:id/status`

- Chuc nang: Khoa hoac mo khoa nguoi dung.
- Quyen truy cap: Admin.
- Du lieu gui len:

```json
{
  "status": "blocked"
}
```

- Du lieu tra ve du kien:

```json
{
  "message": "Cap nhat trang thai nguoi dung thanh cong",
  "user": {
    "id": "user_id",
    "status": "blocked"
  }
}
```

#### PUT `/api/admin/users/:id/role`

- Chuc nang: Cap nhat role nguoi dung.
- Quyen truy cap: Admin.
- Du lieu gui len:

```json
{
  "role": "admin"
}
```

- Du lieu tra ve du kien:

```json
{
  "message": "Cap nhat role nguoi dung thanh cong",
  "user": {
    "id": "user_id",
    "role": "admin"
  }
}
```

## 5. Ma loi du kien

| Ma HTTP | Y nghia | Truong hop thuong gap |
| --- | --- | --- |
| 400 | Bad Request | Du lieu gui len khong hop le |
| 401 | Unauthorized | Chua dang nhap hoac token khong hop le |
| 403 | Forbidden | Khong co quyen truy cap |
| 404 | Not Found | Khong tim thay tai nguyen |
| 500 | Server Error | Loi he thong |

## 6. Ghi chu test bang Postman

1. Goi API `POST /api/auth/register` de tao tai khoan.
2. Goi API `POST /api/auth/login` de lay `accessToken`.
3. Voi cac API quyen `User` hoac `Admin`, them header `Authorization: Bearer <accessToken>`.
4. Kiem tra cac API theo nhom: Auth, User, Board, List, Card, Admin.
