package sqlrepo

import (
	"backend/internal/models"
	"context"
	"database/sql"
)

type UserRepository struct {
	db *sql.DB
}

func NewUserRepository(db *sql.DB) *UserRepository {
	return &UserRepository{db: db}
}

func (r *UserRepository) CreateUser(ctx context.Context, user *models.User) error {
	_, err := r.db.ExecContext(ctx, `INSERT INTO users (id, display_name, email) VALUES ($1, $2, $3)`, user.ID, user.DisplayName, user.Email)
	return err
}

func (r *UserRepository) GetUserByID(ctx context.Context, id string) (*models.User, error) {
	row := r.db.QueryRowContext(ctx, `SELECT id, display_name, email FROM users WHERE id = $1`, id)
	var user models.User
	if err := row.Scan(&user.ID, &user.DisplayName, &user.Email); err != nil {
		return nil, err
	}
	return &user, nil
}
