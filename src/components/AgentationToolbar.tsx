import { Agentation } from 'agentation';

export default function AgentationToolbar() {
	if (!import.meta.env.DEV) {
		return null;
	}

	return <Agentation endpoint="http://localhost:4747" />;
}
