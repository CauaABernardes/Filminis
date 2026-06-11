import logging

from sqlalchemy import create_engine, text
from sqlalchemy.orm import DeclarativeBase, sessionmaker

from app.core.config import settings

logger = logging.getLogger(__name__)


def _create_mysql_engine():
    engine = create_engine(
        settings.DATABASE_URL,
        pool_pre_ping=True,
        pool_recycle=3600,
    )
    with engine.connect() as conn:
        conn.execute(text("SELECT 1"))
    return engine


def _create_sqlite_engine():
    logger.warning(
        "Não foi possível conectar ao MySQL. "
        "Usando SQLite local como fallback (filminis_fallback.db)."
    )
    return create_engine(
        "sqlite:///filminis_fallback.db",
        connect_args={"check_same_thread": False},
    )


def _build_engine():
    try:
        engine = _create_mysql_engine()
        logger.info("Conectado ao banco MySQL com sucesso.")
        return engine
    except Exception as e:
        logger.error(f"Falha ao conectar ao MySQL: {e}")
        return _create_sqlite_engine()


engine = _build_engine()

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


class Base(DeclarativeBase):
    pass


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()