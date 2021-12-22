import { FormEvent, useContext, useState } from "react";
import Modal from "react-modal";
import { Container, TransactionTypeContainer, RadioBox } from "./styles";
import closeImg from "../../assets/Vector.svg";
import incomeImg from "../../assets/Entradas.svg";
import outcomeImg from "../../assets/Saídas.svg";
import { api } from "../../services/api";
import { useTransactions } from "../../hooks/useTransactions";
interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;

}
export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
    const {createTransaction} = useTransactions();
    const [type, setType] = useState('deposit');
    const [title,setTitle] = useState('');
    const [value,setValue] = useState(0);
    const [category,setCategory] = useState('');
   async function handleCreateNewTransition(event: FormEvent) {
        event.preventDefault();

      await createTransaction({
            title,
            amount:value,
            category,
            type
        })
        setTitle('');
        setValue(0);
        setCategory('');
        setType('deposit')
        onRequestClose();
        
    }
    return (
        <Modal overlayClassName="react-modal-overlay" className="react-modal-content" isOpen={isOpen} onRequestClose={onRequestClose}>
            <button type="button" onClick={onRequestClose} className="react-modal-close"><img src={closeImg} alt="Fechar Modal"></img></button>
            <Container onSubmit={handleCreateNewTransition}>
                <h2>Cadastrar transação</h2>
                <input placeholder="Título" value={title} onChange={event => setTitle(event.target.value)} />
                <input type="number" value={value} onChange={event => setValue(Number(event.target.value))} placeholder="Valor" />
                <TransactionTypeContainer>
                    <RadioBox type="button" isActive={type === 'deposit'}  activeColor="green" onClick={() => setType('deposit')}>
                        <img src={incomeImg} alt="Entrada" />
                        <span>Entrada</span>
                    </RadioBox>
                    <RadioBox type="button" isActive={type === 'withdraw'} activeColor="red" onClick={() => setType('withdraw')}>
                        <img src={outcomeImg} alt="Saída" />
                        <span>Saída</span>
                    </RadioBox>
                </TransactionTypeContainer>
                <input placeholder="Categoria" value={category} onChange={event => setCategory(event.target.value)} />
                <button type="submit">
                    Cadastrar
                </button>
            </Container>


        </Modal>
    );
}