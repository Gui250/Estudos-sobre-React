import styles from "./styles.module.css";

type Props = React.ComponentProps<"button">;

export function Button({ title, ...rest }: Props) {
  return (
    <button type="button" className={styles.button} {...rest}>
      {title}
    </button>
  );
}
