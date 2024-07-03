function ModalWindow({ isOpen, onClose, errorMessage }) {
    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Ошибка</h2>
                <p>{errorMessage}</p>
                <button onClick={onClose}>Закрыть</button>
            </div>
        </div>
    );
}
export default ModalWindow;