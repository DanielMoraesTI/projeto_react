import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTransaction, getCategories } from "../api";

export function useAddTransactionLogic() {
  const descriptionRef = useRef(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    type: "expense",
    category: "alimentacao",
    date: new Date().toISOString().split("T")[0],
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    descriptionRef.current?.focus();
  }, []);

  const {
    data: categories = [],
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const mutation = useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      navigate("/");
    },
    onError: (err) => {
      setError(err.message || "Erro ao criar transação. Tente novamente.");
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.description.trim()) {
      setError("Descrição é obrigatória");
      descriptionRef.current?.focus();
      return;
    }

    if (!formData.amount || parseFloat(formData.amount) === 0) {
      setError("Valor deve ser maior que 0");
      return;
    }

    const amount =
      formData.type === "expense"
        ? -Math.abs(parseFloat(formData.amount))
        : Math.abs(parseFloat(formData.amount));

    mutation.mutate({
      description: formData.description.trim(),
      amount,
      category: formData.category,
      date: formData.date,
      type: formData.type,
    });
  };

  return {
    descriptionRef,
    formData,
    categories,
    isLoadingCategories,
    isErrorCategories,
    mutation,
    error,
    handleChange,
    handleSubmit,
  };
}
