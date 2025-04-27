import { styles } from "@/styles/feed.styles";
import { ScrollView } from "react-native";
import Story from "@/components/Story";
import { STORIES } from "@/constants/mock-data";

const StoriesSection = () => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.storiesContainer}
    >
      {STORIES.map((story) => (
        <Story key={story.id} story={story} />
      ))}
    </ScrollView>
  )
};

export default StoriesSection;