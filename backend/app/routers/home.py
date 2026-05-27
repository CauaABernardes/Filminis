from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.dependencies.auth import require_admin
from app.models.models import DestaqueHome, Filme
from app.schemas.schemas import DestaqueHomeOut, DestaqueHomeSet, MsgOut

router = APIRouter(prefix="/home", tags=["Home"])


@router.get("/destaques", response_model=List[DestaqueHomeOut])
def listar_destaques(db: Session = Depends(get_db)):
    """Retorna os filmes em destaque ordenados. Público."""
    return (
        db.query(DestaqueHome)
        .order_by(DestaqueHome.ordem)
        .all()
    )


@router.put("/destaques", response_model=List[DestaqueHomeOut])
def salvar_destaques(
    body: DestaqueHomeSet,
    db: Session = Depends(get_db),
    _=Depends(require_admin),
):
    """
    Substitui todos os destaques pela lista enviada.
    A ordem dos ids determina a ordem de exibição.
    Apenas admin.
    """
    # Valida que todos os filmes existem
    for filme_id in body.ids_filmes:
        if not db.get(Filme, filme_id):
            raise HTTPException(status_code=404, detail=f"Filme {filme_id} não encontrado")

    # Remove os destaques atuais e recria
    db.query(DestaqueHome).delete()
    for ordem, filme_id in enumerate(body.ids_filmes):
        db.add(DestaqueHome(id_filme=filme_id, ordem=ordem))

    db.commit()

    return (
        db.query(DestaqueHome)
        .order_by(DestaqueHome.ordem)
        .all()
    )


@router.delete("/destaques", response_model=MsgOut)
def limpar_destaques(
    db: Session = Depends(get_db),
    _=Depends(require_admin),
):
    """Remove todos os destaques. Apenas admin."""
    db.query(DestaqueHome).delete()
    db.commit()
    return MsgOut(detail="Destaques removidos")