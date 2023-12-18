import { Text, View, StyleSheet} from 'react-native'
import Star from 'react-native-stars'
import  Ionicons  from '@expo/vector-icons/Ionicons';

export default function Vote(props) {
    const vote_average = props.vote_average;
    const vote_count = props.vote_count;

    return (
        <View style={style.vote}>
            <Star
                default={(vote_average/2)}
                count={5}
                half={true}
                fullStar={<Ionicons name="star-sharp" style={style.star} />}
                emptyStar={<Ionicons name="star-outline" style={style.star} />}
                halfStar={<Ionicons name="star-half-sharp" style={style.star} />}
            ></Star>
        <Text style={style.voteCount}>{vote_count}</Text>
        </View>
    )
}


const style = StyleSheet.create({
    vote: {
        flexDirection: 'row',
        marginTop: 10,
    },
    voteCount: {
        color: '#ccc',
        marginLeft: 3
    },
    star: {
        color: 'yellow',
        backgroundColor: 'transparent',
        textShadowColor: 'black',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 2,
    }
});