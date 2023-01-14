import User from "../models/User.js";

/* READ */
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getFriends = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const friends = await Promise.all(
      user.friends.map((friendId) => {
        return User.findById(friendId);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      const { _id, firstName, lastName, occupation, location, picturePath } =
        friend;
      friendList.push({
        _id,
        firstName,
        lastName,
        occupation,
        location,
        picturePath,
      });
    });
    res.status(200).json(friendList);
  } catch (err) {
    res.status(500).json(err);
  }
};

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);
    if (user.friends.includes(friendId)) {
      console.log("friends")
      await user.updateOne({ $pull: { friends: friendId } });
      await friend.updateOne({ $pull: { friends: id } });
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
      
      // res.status(200).json("Friend has been removed");
    } else {
      await user.updateOne({ $push: { friends: req.params.friendId } });
      await friend.updateOne({ $push: { friends: req.params.id } });
      user.friends.push(friendId);
      friend.friends.push(id);
      // res.status(200).json("Friend has been added");
    }
    const friendList = await Promise.all(
      user.friends.map((friendId) => {
        return User.findById(friendId);
      })
    );
    let friends = [];
    friendList.map((friend) => {
      const { _id, firstName, lastName, occupation, location, picturePath } =
        friend;
      friends.push({
        _id,
        firstName,
        lastName,
        occupation,
        location,
        picturePath,
      });
    });
    res.status(200).json(friends);
  } catch (err) {
    res.status(500).json(err);
  }
};
